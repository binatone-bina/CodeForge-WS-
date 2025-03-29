const twilio = require('twilio');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

// Create Twilio client
const createTwilioClient = () => {
  return twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
};

// Format phone number for Twilio (same as in smsService.js)
const formatPhoneNumber = (phoneNumber) => {
  let digits = phoneNumber.replace(/\D/g, '');
  
  if (digits.length === 10) {
    digits = '1' + digits;
  }
  
  return '+' + digits;
};

// Make emergency voice calls
const makeEmergencyCalls = async (user, location, emergencyContacts) => {
    try {
        // Check if user has disabled emergency calls
        if (user.settings && user.settings.emergencyCalls === false) {
          console.log('Emergency calls disabled in user settings');
          return { success: false, error: 'Emergency calls disabled by user', disabled: true };
        }

        // Validate location format
        if (!location || (!location.lat && !location.latitude) || (!location.lng && !location.longitude)) {
          console.error("Invalid location data for emergency calls");
          return { success: false, error: "Invalid location data" };
        }

        // Use either format
        const latitude = location.lat || location.latitude;
        const longitude = location.lng || location.longitude;
        
        try {
            const client = createTwilioClient();
            
            // Filter contacts that have phone numbers
            const contactsWithPhones = emergencyContacts.filter(contact => 
              contact.phone && contact.phone.trim() !== ''
            );
            
            if (contactsWithPhones.length === 0) {
              return { success: false, error: 'No emergency contacts with phone numbers' };
            }
            
            console.log(`Making emergency calls to ${contactsWithPhones.length} contacts`);
            
            // Create TwiML for the voice message
            const twiml = new VoiceResponse();
            twiml.say({
              voice: 'woman',
              language: 'en-US'
            }, `This is an emergency SOS alert from ${user.name}. They need immediate assistance. ` +
               `Their current location coordinates are: Latitude ${latitude}, Longitude ${longitude}. ` +
               `Please check your SMS for a Google Maps link to their location. This message will repeat.`);
            
            // Repeat the message
            twiml.pause({ length: 1 });
            twiml.say({
              voice: 'woman',
              language: 'en-US'
            }, `This is an emergency SOS alert from ${user.name}. They need immediate assistance. ` +
               `Please check your SMS for their location. This is an automated emergency call.`);
            
            // Make calls in sequence to avoid overwhelming Twilio and the user
            const results = [];
            
            for (const contact of contactsWithPhones) {
              try {
                const formattedPhone = formatPhoneNumber(contact.phone);
                console.log(`Calling emergency contact: ${contact.name} (${formattedPhone})`);
                
                const call = await client.calls.create({
                  twiml: twiml.toString(),
                  to: formattedPhone,
                  from: process.env.TWILIO_PHONE_NUMBER,
                  timeout: 20 // Limit to 20 seconds before going to voicemail
                });
                
                results.push({
                  success: true,
                  contact: contact.name,
                  callSid: call.sid
                });
              } catch (error) {
                console.error(`Failed to call ${contact.name}:`, error.message);
                results.push({
                  success: false,
                  contact: contact.name,
                  error: error.message
                });
              }
              
              // Brief delay between calls to avoid rate limiting
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
            
            const successfulCalls = results.filter(r => r.success);
            if (successfulCalls.length > 0) {
              return { success: true, calls: results, successCount: successfulCalls.length };
            } else {
              return { success: false, calls: results, error: 'Failed to make any emergency calls' };
            }
          } catch (error) {
            console.error('Emergency calling failed:', error);
            return { success: false, error: error.message };
          }
      } catch (error) {
        console.error('Emergency calling failed:', error);
        return { success: false, error: error.message };
      }
};

module.exports = { makeEmergencyCalls };