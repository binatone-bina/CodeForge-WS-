const twilio = require('twilio');

// Create Twilio client
const createTwilioClient = () => {
  return twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
};

// Format phone number for Twilio
const formatPhoneNumber = (phoneNumber) => {
  // Remove any non-digit characters
  let digits = phoneNumber.replace(/\D/g, '');
  
  // Ensure it has country code, add +1 (US) if not present
  // Adjust this logic based on your users' country codes
  if (digits.length === 10) {
    digits = '91' + digits;
  }
  
  return '+' + digits;
};

// Send SOS SMS
const sendSOSSMS = async (user, location, emergencyContacts) => {
  try {

    if (!location || (!location.lat && !location.latitude) || (!location.lng && !location.longitude)) {
      return { success: false, error: "Invalid location data" };
    }

    // Use either format
    const latitude = location.lat || location.latitude;
    const longitude = location.lng || location.longitude;

    const client = createTwilioClient();
    
    // Filter contacts that have phone numbers
    const contactsWithPhones = emergencyContacts.filter(contact => 
      contact.phone && contact.phone.trim() !== ''
    );
    
    if (contactsWithPhones.length === 0) {
      return { success: false, error: 'No emergency contacts with phone numbers' };
    }
    
    console.log(`Sending SMS to ${contactsWithPhones.length} contacts`);
    
    const smsPromises = contactsWithPhones.map(contact => {
      const formattedPhone = formatPhoneNumber(contact.phone);
      console.log(`Formatted phone number: ${contact.phone} -> ${formattedPhone}`);
      
      const message = `🚨 EMERGENCY SOS ALERT: ${user.name} needs help! Location: https://www.google.com/maps?q=${latitude},${longitude} (${contact.relation})`;
      
      return client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: formattedPhone
      });
    });
    
    await Promise.all(smsPromises);
    console.log('All SMS sent successfully');
    return { success: true };
  } catch (error) {
    console.error('SMS sending failed:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendSOSSMS };