import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  Button,
} from "react-native";
import images from "../../constants/images";
import museumsData from "../../constants/museum";
import Icon from "react-native-vector-icons/FontAwesome";
import NavBar from "../navigation/NavBar";
import { useNavigation } from "@react-navigation/native";
import { Linking } from 'react-native';


const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState("");
  const [museumOptions, setMuseumOptions] = useState([]);
  const [showPayNowButton, setShowPayNowButton] = useState(false);
  const [payMessageIndex, setPayMessageIndex] = useState(null); // To track which message should show the button

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      setMessages([
        {
          sender: "system",
          text: "Welcome to Book My Ticket, how can I help you?",
        },
      ]);
      setOptionsVisible(true);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const handlePayment = () => {
    const upiUrl = `upi://pay?pa=shalinisrinivasan72@okaxis&pn=Book my ticket&mc=0000&tr=TXNID12345&tn=Payment for Tickets&am=500&cu=INR`;

    // Try to open the UPI payment app with the above URL
    Linking.openURL(upiUrl)
      .then(() => {
        // After payment, simulate the message that the payment was successful
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "system",
            text: "Navigating to the payment page...\n<PAYMENT PAGE POP UPS - USER PAYS USING UPI>\nPayment successful. Please download the tickets <DOWNLOADABLE PDF WITH QR>",
          },
        ]);
        setShowPayNowButton(false);
        setPayMessageIndex(null); // Reset the pay button index after payment
      })
      .catch(() => {
        // Handle the case where no UPI app is available or payment failed
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "system",
            text: "Payment failed or no UPI app found. Please try again.",
          },
        ]);
      });
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = inputValue.trim().toLowerCase();

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: inputValue },
      ]);

      // Hard-coded chatbot responses based on the script
      switch (userMessage) {
        case "hi":
        case "hello":
        case "hey":
        case "hi! how are you?":
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "system", text: "Hello! I am good. How can I help you?" },
          ]);
          break;
        case "what do you want to do today?":
        case "may be visit some place":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "What about going to some place which amuses your brain?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "yeah i would be happy to go. is there such place?":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Yes, I would like to suggest places like Museums, Science City or Planetarium which would perfectly suit your requirement.",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "well done. i will visit museum then. but i don't know where is it and how to book tickets?":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Don't worry, I will take care. Just answer a few follow-up questions. Where are you located?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "i am at anna nagar, chennai":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Anna Nagar is close to many exciting museums actually. On which date would you like to visit the museum?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "i would like to visit tomorrow.":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Tomorrow it's Tuesday. Mostly all Museums in Chennai will be closed because of weekly holiday. Would you like to reconsider the dates or should I find museums which are open tomorrow?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "oh! okay then i would like to go on wednesday i.e. day after tomorrow.":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Great Choice. I am marking the date as 11th September (Wednesday). By the way, what timings would you like to spend at the place?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "i would like to spend half a day. i will go to the place by morning and i want to leave the place by afternoon 3 pm.":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Great choice, I will note the timings as 10 am to 3 pm as 10 am is the opening time for most of the museums and science centres. Is Egmore convenient for you to reach?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "egmore? no! egmore is little far for me.":
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "system", text: "Okay, Is Guindy okay for you?" },
            { sender: 'system', text: 'Great choice. Guindy Science Museum would suit you the best. There are three different ticket systems there:\n1. Gold Ticket - Rs 100 per head for adults, Rs 75 for children below 12 years (Includes Entry, 3D show, Science Park, Planetarium Show, Science Exhibitions, Science Games)\n2. Silver Ticket - Rs 75 per head for adults, Rs 50 for children below 12 years (Includes Entry, 3D show, Science Park, Science Exhibitions, Science Games)\n3. Bronze Ticket - Rs 50 per head for adults, Rs 25 for children below 12 years (Includes Entry, Science Park, Science Exhibitions, Science Games)\nWhat type of ticket would you like to buy?' },
          ]);
          setOptionsVisible(false);
          break;

        case "yeah! guindy is near to me i will be able to reach there easily.":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Great choice. Guindy Birla Planetarium would suit you the best. There are three different ticket systems there:\n1. Gold Ticket - Rs 100 per head for adults, Rs 75 for children below 12 years (Includes Entry, 3D show, Science Park, Planetarium Show, Science Exhibitions, Science Games)\n2. Silver Ticket - Rs 75 per head for adults, Rs 50 for children below 12 years (Includes Entry, 3D show, Science Park, Science Exhibitions, Science Games)\n3. Bronze Ticket - Rs 50 per head for adults, Rs 25 for children below 12 years (Includes Entry, Science Park, Science Exhibitions, Science Games)\nWhat type of ticket would you like to buy?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "i would like to buy the golden ticket":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Great choice. How many people are accompanying you?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "3 adults and 1 child":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Great. Could you mention their names, gender and age?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "rahul - male, 25; vimala - female, 21; vinitha - female, 52; raju - male, 11":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Thanks for sharing. All details stored. Would you like to pay now or pay at the venue?",
            },
          ]);
          setOptionsVisible(false);
          break;

        case "pay now":
        case "i will pay now using upi":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: "Would you like to proceed with payment now?",
            },
          ]);
          setOptionsVisible(false);
          setShowPayNowButton(true);
          setPayMessageIndex(messages.length); // Store the index of the current message
          break;

          break;
  
        case 'good! thanks...':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'You are welcome.' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'ஒரு இடத்துக்கு செல்வோமா':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'உங்கள் மூளையை மகிழ்விக்கும் ஒரு இடம் சென்றால் எப்படி இருக்கும்?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'ஆமாம், எனக்கு மகிழ்ச்சியாக இருக்கும். அப்படி ஏதாவது இடம் இருக்கிறதா?':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'ஆமாம், நான் உங்களுக்கு அருங்காட்சியகம், அறிவியல் நகரம், அல்லது விண்மீன் காட்சியகம் போன்ற இடங்களை பரிந்துரைக்கிறேன், அவை உங்கள் தேவைக்கு பொருத்தமாக இருக்கும்.' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'நன்றாகவே இருக்கிறது. நான் அருங்காட்சியகத்துக்கு செல்வேன். ஆனால், எனக்கு அது எங்கே இருக்கிறது, எப்படி டிக்கெட்டுகளை புக் செய்வது என்பது தெரியாது.':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'கவலைப்படாதீர்கள், நான் கவனிக்கிறேன். சில கேள்விகளுக்கு பதில் கூறுங்கள். நீங்கள் எங்கு இருக்கிறீர்கள்?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'நான் அண்ணா நகர், சென்னையில் இருக்கிறேன்':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'அண்ணா நகர் அருகில் பல சுவாரசியமான அருங்காட்சியகங்கள் உள்ளன. நீங்கள் எப்போது வர விரும்புகிறீர்கள்?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'நான் நாளை வர விரும்புகிறேன்':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'நாளை செவ்வாய்க்கிழமை. சென்னையில் பெரும்பாலான அருங்காட்சியகங்கள் வாராந்திர விடுமுறை காரணமாக மூடப்பட்டிருக்கும். நீங்கள் தேதியை மறுபரிசீலனை செய்ய விரும்புகிறீர்களா, அல்லது நாளை திறந்திருக்கும் இடங்களை நான் பார்க்கவா?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'அப்போ, நான் நாளைமறுநாள், புதன்கிழமை போக விரும்புகிறேன்.':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'நல்ல தேர்வு. நான் தேதி 11 செப்டம்பர் (புதன்கிழமை) என்று குறிக்கிறேன். நீங்கள் எவ்வளவு நேரம் செலவழிக்க விரும்புகிறீர்கள்?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'நான் பகலின் அரை நாள் செலவழிக்க விரும்புகிறேன். காலை வந்து, மதியம் 3 மணிக்கு வெளியேறுவேன்.':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'அறிவுபூர்வமான தேர்வு. நான் நேரத்தை 10 மணி முதல் 3 மணி வரை பதிவு செய்தேன். எக்மோர் உங்களுக்கு வசதியாக இருக்கிறதா?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'எக்மோர்? இல்ல, எனக்கு சிறிது தூரம்.':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'சரி, கிண்டி உங்களுக்கு சரியாக இருக்கும் என நினைக்கிறீர்களா?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'ஆமாம்! கிண்டி அருகில் இருக்கிறது, நான் எளிதாக வந்து சேருவேன்.':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'சிறப்பான தேர்வு! கிண்டி அறிவியல் அருங்காட்சியகம் உங்களுக்கு சிறந்ததாக இருக்கும். உங்களுக்கு மூன்று வகையான டிக்கெட்கள் உள்ளன:\n1. தங்க டிக்கெட் - பெரியவர்களுக்கு ₹100, சிறுவர் (12 வயதுக்குள்) ₹75 (நுழைவு, 3D காட்சி, அறிவியல் பூங்கா, விண்மீன் காட்சி, மற்றும் பல)\n2. வெள்ளி டிக்கெட் - பெரியவர்களுக்கு ₹75, சிறுவர் ₹50\n3. செம்பு டிக்கெட் - பெரியவர்களுக்கு ₹50, சிறுவர் ₹25\nநீங்கள் எந்த வகை டிக்கெட்டை தேர்ந்தெடுப்பீர்கள்?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'நான் தங்க டிக்கெட் வாங்குவேன்':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'நல்ல தேர்வு. உங்கள் குழுவில் எத்தனை பேர் இருக்கிறீர்கள்?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case '3 பெரியவர்கள், 1 குழந்தை':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'சரி, அவர்களின் பெயர், பாலினம், மற்றும் வயதை கூற முடியுமா?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'ராகுல் - ஆண், 25; விமலா - பெண், 21; வினிதா - பெண், 52; ராஜு - ஆண், 11':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'நன்றி! அனைத்து விவரங்களும் பதிவு செய்யப்பட்டது. நீங்கள் இப்போது கட்டணம் செலுத்த விரும்புகிறீர்களா அல்லது இடத்தில் செலுத்தவா?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'நான் இப்போது UPI மூலம் செலுத்துவேன்':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'உண்மையா, உங்களை கட்டண பக்கத்துக்கு அழைத்து செல்கிறேன்.\n<PAYMENT PAGE POP UPS - USER PAYS USING UPI>\nகட்டணம் வெற்றிகரமாக முடிந்தது. தயவுசெய்து உங்கள் டிக்கெட்டை பதிவிறக்கவும் <DOWNLOADABLE PDF WITH QR>' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'எந்தவொரு வழிகாட்டுதலும் உள்ளதா?':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'அனைத்து வழிகாட்டுதல்களும் டிக்கெட்டுடன் தரப்பட்டுள்ளது. ஆனால் உங்களுக்கு வசதியாக நான் மீண்டும் பட்டியலிடுகிறேன்:\n1. தயவுசெய்து காலை 10 மணிக்கு வருக.\n2. 3D காட்சி 11 மணிக்கு தொடங்குகிறது.\n3. விண்மீன் காட்சி 1 மணி முதல் 2 மணி வரை இருக்கிறது.\n4. அனைத்து உறுப்பினர்களின் அடையாள அட்டை மற்றும் டிக்கெட் உடன் கொண்டு செல்லவும்.\n5. வெளிப்புற உணவு மற்றும் தண்ணீர் கொண்டுவர அனுமதிக்கப்படுகிறது. மேலும் ஏதேனும் கேள்விகள் உள்ளனவா?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'சரி, நன்றி...':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'வணக்கம். புது அனுபவத்தை அனுபவிக்குங்கள்!' },
          ]);
          setOptionsVisible(false);
          break;          
        
        case 'நன்றி':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'எங்கள் சேவைகளைப் பயன்படுத்தியதற்கு நன்றி. வேறு ஏதாவது உதவி வேண்டுமா?' },
          ]);
          setOptionsVisible(false);
          break;

        case 'धन्यवाद':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'हमारी सेवाओं का उपयोग करने के लिए धन्यवाद। किसी अन्य सहायता की आवश्यकता है?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'शायद कहीं घूमने चलें':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'ऐसी जगह क्यों न जाएं जो आपके दिमाग को रोमांचित करे?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'हाँ, मैं खुशी-खुशी जाऊंगा। क्या ऐसी कोई जगह है?':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'हाँ, मैं आपको म्यूज़ियम, साइंस सिटी या तारामंडल जैसी जगहों का सुझाव दूंगा, जो आपकी आवश्यकताओं के लिए बिल्कुल उपयुक्त हैं।' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'अच्छा किया। मैं म्यूज़ियम जाऊंगा। लेकिन मुझे नहीं पता कि यह कहाँ है और टिकट कैसे बुक करें?':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'चिंता न करें, मैं सब संभाल लूंगा। बस कुछ सवालों का जवाब दें। आप कहाँ स्थित हैं?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'मैं अन्ना नगर, चेन्नई में हूँ':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'अन्ना नगर के पास कई रोमांचक म्यूज़ियम हैं। आप किस तारीख को म्यूज़ियम जाना चाहेंगे?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'मैं कल जाना चाहूंगा।':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'कल मंगलवार है। चेन्नई के सभी म्यूज़ियम अधिकतर बंद रहते हैं। क्या आप तारीख पर पुनर्विचार करना चाहेंगे या मैं ऐसे म्यूज़ियम खोजूं जो कल खुले हों?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'अरे! ठीक है, तो मैं परसों बुधवार को जाना चाहूंगा।':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'बहुत बढ़िया। मैंने तारीख 11 सितंबर (बुधवार) तय कर दी है। वैसे, आप कितने समय तक वहाँ रहना चाहेंगे?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'मैं आधे दिन रहना चाहूंगा। सुबह पहुँचूँगा और दोपहर 3 बजे तक निकलना चाहूंगा।':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'अच्छी पसंद है, मैंने समय 10 बजे से 3 बजे तक का नोट कर लिया है। क्या एग्मोर आपके लिए सुविधाजनक है?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'एग्मोर? नहीं! एग्मोर मेरे लिए थोड़ा दूर है।':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'ठीक है, क्या गुिंडी आपके लिए ठीक है?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'हाँ! गुिंडी मेरे पास है, मैं आसानी से पहुँच सकता हूँ।':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'बहुत बढ़िया! गुिंडी साइंस म्यूज़ियम आपके लिए सबसे अच्छा रहेगा। वहां तीन प्रकार के टिकट हैं:\n1. गोल्ड टिकट - वयस्कों के लिए ₹100, बच्चों (12 साल से कम) के लिए ₹75 (एंट्री, 3डी शो, साइंस पार्क, तारामंडल शो आदि)\n2. सिल्वर टिकट - वयस्कों के लिए ₹75, बच्चों के लिए ₹50\n3. ब्रॉन्ज टिकट - वयस्कों के लिए ₹50, बच्चों के लिए ₹25\nआप किस प्रकार का टिकट खरीदना चाहेंगे?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'मैं गोल्डन टिकट खरीदना चाहूंगा':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'बहुत बढ़िया। आपके साथ कितने लोग हैं?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case '3 वयस्क और 1 बच्चा':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'ठीक है। क्या आप उनके नाम, लिंग और उम्र बता सकते हैं?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'राहुल - पुरुष, 25; विमला - महिला, 21; विनिता - महिला, 52; राजू - पुरुष, 11':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'धन्यवाद! सभी विवरण दर्ज हो गए हैं। क्या आप अभी भुगतान करेंगे या स्थान पर भुगतान करेंगे?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'मैं अभी UPI से भुगतान करूंगा':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'ज़रूर, मैं आपको भुगतान पृष्ठ पर ले जा रहा हूँ।\n<PAYMENT PAGE POP UPS - USER PAYS USING UPI>\nभुगतान सफल रहा। कृपया टिकट डाउनलोड करें <DOWNLOADABLE PDF WITH QR>' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'कोई निर्देश?':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'सभी निर्देश टिकट के साथ दिए गए हैं। लेकिन आपकी सुविधा के लिए मैं उन्हें फिर से बता देता हूँ:\n1. कृपया सुबह 10 बजे पहुँचें।\n2. 3D शो सुबह 11 बजे से 11.30 बजे तक है।\n3. तारामंडल शो दोपहर 1 बजे से 2 बजे तक है।\n4. सभी सदस्यों का वैध सरकारी आईडी और टिकट साथ रखें।\n5. बाहर का खाना और पानी की बोतलें ले जाना अनुमति है। और कोई सवाल?' },
          ]);
          setOptionsVisible(false);
          break;
        
        case 'ठीक है धन्यवाद...':
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'system', text: 'आपका स्वागत है।' },
          ]);
          setOptionsVisible(false);
          break;      

          case 'shayad kahin ghoomne chalein':
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'system', text: 'aisi jagah kyon na jaayein jo aapke dimaag ko romaanchit kare?' },
            ]);
            setOptionsVisible(false);
            break;
          
          case 'haan, main khushi-khushi jaunga. kya aisi koi jagah hai?':
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'system', text: 'haan, main aapko museum, science city ya taramandal jaise jagah sugget karunga, jo aapki zarurat ke liye bilkul upyukt hain.' },
            ]);
            setOptionsVisible(false);
            break;
          
          case 'accha kiya. main museum jaunga. lekin mujhe nahi pata yeh kahan hai aur ticket kaise book karun?':
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'system', text: 'chinta mat kariye, main sab handle kar lunga. bas kuch sawalon ke jawab dijiye. aap kahan situated hain?' },
            ]);
            setOptionsVisible(false);
            break;
          
          case 'main Anna Nagar, Chennai mein hoon':
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'system', text: 'Anna Nagar ke paas kai exciting museums hain. aap kis date ko museum jaana chahenge?' },
            ]);
            setOptionsVisible(false);
            break;
          
          case 'main kal jaana chaahunga':
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'system', text: 'Kal Tuesday hai. Chennai ke zyadatar museums kal band hote hain. kya aap date reconsider karenge ya main aise museums dhoondhun jo kal khule hoon?' },
            ]);
            setOptionsVisible(false);
            break;
          
          case 'arre! thik hai, toh main parso Wednesday ko jaunga':
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'system', text: 'bahut badiya. maine date 11 September (Wednesday) schedule kar li hai. waise, aap kitni der tak wahaan rehna chahenge?' },
            ]);
            setOptionsVisible(false);
            break;
          
          case 'main aadha din rehna chahunga. subah aaunga aur dopeher 3 baje tak nikalna chahunga.':
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'system', text: 'acchi choice hai, maine time 10 baje se 3 baje tak ka note kar liya hai. kya Egmore aapke liye convenient hai?' },
            ]);
            setOptionsVisible(false);
            break;
          
          case 'Egmore? nahin, Egmore thoda door hai mere liye':
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'system', text: 'thik hai, kya Guindy aapke liye thik rahega?' },
            ]);
            setOptionsVisible(false);
            break;
          
          case 'haan! Guindy mere paas hai, main aasani se pahunch sakta hoon.':
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'system', text: 'bahut badhiya! Guindy Science Museum aapke liye best rahega. wahan teen tarah ke tickets hain:\n1. Gold ticket - badon ke liye ₹100, bacchon (12 saal se kam) ke liye ₹75 (entry, 3D show, science park, planetarium show, etc.)\n2. Silver ticket - badon ke liye ₹75, bacchon ke liye ₹50\n3. Bronze ticket - badon ke liye ₹50, bacchon ke liye ₹25\nAap kis tarah ka ticket kharidna chahenge?' },
            ]);
            setOptionsVisible(false);
            break;
          
          case 'main Golden ticket kharidna chahunga':
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'system', text: 'bahut badiya. aapke saath kitne log hain?' },
            ]);
            setOptionsVisible(false);
            break;
          
          case '3 bade aur 1 bacha':
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'system', text: 'thik hai. kya aap unke naam, gender aur age bata sakte hain?' },
            ]);
            setOptionsVisible(false);
            break;
          
          case 'Rahul - male, 25; Vimla - female, 21; Vinita - female, 52; Raju - male, 11':
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'system', text: 'dhanyavaad! sabhi details record ho gaye hain. kya aap abhi payment karenge ya jagah par payment karenge?' },
            ]);
            setOptionsVisible(false);
            break;
          
          case 'main abhi UPI se payment karunga':
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'system', text: 'zarur, main aapko payment page par le ja raha hoon.\n<PAYMENT PAGE POP UPS - USER PAYS USING UPI>\npayment successful raha. kripya apna ticket download karein <DOWNLOADABLE PDF WITH QR>' },
            ]);
            setOptionsVisible(false);
            break;
          
          case 'koi instructions?':
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'system', text: 'sabhi instructions ticket ke sath diye gaye hain. lekin aapki suvidha ke liye main fir se bata deta hoon:\n1. kripya subah 10 baje aaiye.\n2. 3D show subah 11 baje se 11:30 tak hai.\n3. planetarium show dopahar 1 baje se 2 baje tak hai.\n4. sabhi members ka valid government ID aur ticket sath rakhein.\n5. bahar ka khana aur paani le jana allowed hai. aur koi sawal?' },
            ]);
            setOptionsVisible(false);
            break;
          
          case 'thik hai dhanyavaad...':
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'system', text: 'aapka swagat hai.' },
            ]);
            setOptionsVisible(false);
            break;

            case 'Oru idathukku selvomaa':
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'system', text: 'Ungal moolaiya magizhvikka oru idam senraal eppadi irukkum?' },
              ]);
              setOptionsVisible(false);
              break;
            
            case 'Aamaam, enakku magizhchiya irukkum. Appadi ethavathu idam irukkirathaa?':
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'system', text: 'Aamaam, naan ungalukku arungatchiyagam, ariviyal nagaram, allathu vinnmeen katchiyagam pol inidangalai parindurikkiren, avaigal ungal thevaiyukkum porundhiya irukkum.' },
              ]);
              setOptionsVisible(false);
              break;
            
            case 'Nandraagave irukku. Naan arungatchiyagathukku selven. Aanaal, enakku adhu engay irukku endra theriyavillai. Eppadi ticket bukk seyya?':
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'system', text: 'Kavalai padatheenga, naan kaavalikaren. Sila kelvigalukku bathil sollunga. Neenga enga irukeenga?' },
              ]);
              setOptionsVisible(false);
              break;
            
            case 'Naan Anna Nagar, Chennai-la irukken':
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'system', text: 'Anna Nagar arugil pala suvarasiyamana arungatchiyagal irukkinrana. Neenga eppo arungatchiyagam varavirumbureenga?' },
              ]);
              setOptionsVisible(false);
              break;
            
            case 'Naan naalai varavirumbiren':
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'system', text: 'Naalai sevvaiyil serundhu Chennaiyin perumbal arungatchiyagal mudhalnaalukkaaga moodappadum. Neenga thethiyai maatravum virumbureengala, allathu naalai thiranthu irukkum idangalai naan paarpava?' },
              ]);
              setOptionsVisible(false);
              break;
            
            case 'Appo, naan naalaikku mudi, budhan naal poogirain':
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'system', text: 'Nalla theerpu. Naan thethi 11 September (budhan) endru kurikirain. Neenga evvalavu neram selvazhikka virumbureenga?' },
              ]);
              setOptionsVisible(false);
              break;
            
            case 'Naan pakalin arai naal selvazhikkiren. Kaalai vanthu, madhiya naal mudhal 3 mani varai velia pogiren':
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'system', text: 'Arivupoorvamaana theerpu. Naan neeram 10 mani mudhal 3 mani varai pathivu seithen. Egmore ungalaikku vasathiya irukkuma?' },
              ]);
              setOptionsVisible(false);
              break;
            
            case 'Egmore? Illa! Ennaku konjam doorama irukku':
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'system', text: 'Sari, Guindy ungalukku sariyana idama irukka?' },
              ]);
              setOptionsVisible(false);
              break;
            
            case 'Aamaam! Guindy pakkathila irukku, naan easy-a vandhu seruven':
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'system', text: 'Sirappana theerpu! Guindy Science Museum ungalukku miga sariyana idama irukkum. Anga moonu vidhamaana ticketgal irukku:\n1. Gold Ticket - Periyavargalukku ₹100, Siruvar (12 vayathirku keezh) ₹75 (Entry, 3D show, Science park, planetarium show, etc.)\n2. Silver Ticket - Periyavargalukku ₹75, Siruvar ₹50\n3. Bronze Ticket - Periyavargalukku ₹50, Siruvar ₹25\nNeenga ethu type-a ticket vaanguveenga?' },
              ]);
              setOptionsVisible(false);
              break;
            
            case 'Naan gold ticket vaangaren':
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'system', text: 'Nalla theerpu. Ungal koodave ethana per irukeenga?' },
              ]);
              setOptionsVisible(false);
              break;
            
            case '3 periyavargal, 1 kuzhandhai':
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'system', text: 'Sari, avargalin peyar, palinam, matrum vayathai solmudiyuma?' },
              ]);
              setOptionsVisible(false);
              break;
            
            case 'Rahul - Aan, 25; Vimala - Pen, 21; Vinita - Pen, 52; Raju - Aan, 11':
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'system', text: 'Nandri! Ellaa vivarangalum pathivachidapattadhu. Neenga ippodhe katramam seyyave virumbureengala, illai edathil katramama?' },
              ]);
              setOptionsVisible(false);
              break;
            
            case 'Naan ippodhe UPI-a katramam seyyaren':
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'system', text: 'Sure, naan ungalai kattidam pakkathirku azhithu selgiren.\n<PAYMENT PAGE POP UPS - USER PAYS USING UPI>\nKattidam vetriyaaga mudinthadhu. Dayavu seidhu ungal ticket-ai thalli irangal <DOWNLOADABLE PDF WITH QR>' },
              ]);
              setOptionsVisible(false);
              break;
            
            case 'Ethavathu vazhikaattuthal irukka?':
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'system', text: 'Ellaa vazhikaattuthalgalum ticket-oduthan kuduthaagum. Aanaal, ungalukku easy-aaga naan meendum solgiren:\n1. Dayavu seidhu kaalai 10 mani varuge.\n2. 3D Show 11 mani mudhal 11:30 varai.\n3. Planetarium Show 1 mani mudhal 2 mani varai.\n4. Ellaa udaviyum sarithirathaai idathirku thalli irangal.\n5. Veliyil unavu, thanneer koduthu varavum anuvaama irukku. Vera endha kelvigal irukkaa?' },
              ]);
              setOptionsVisible(false);
              break;
            
            case 'Sari, nandri...':
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'system', text: 'Vannakkam! Puthu anubavathai anubavikkavum!' },
              ]);
              setOptionsVisible(false);
              break;
        
        default:
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "system",
              text: `I didn’t understand that. Please choose an option or rephrase your query.`,
            },
          ]);
          setOptionsVisible(true);
          break;
      }

      setInputValue("");
    }
  };

return (
  <View className="flex-1 h-full bg-white">
    {/* Header Section */}
    <View className="bg-orange mt-8">
      <TouchableOpacity className="mx-2 my-[2%]" onPress={() => navigation.navigate("home")}>
        <Icon name="arrow-left" color={"white"} size={18}>
          <Text className="text-white text-buttonText text-2xl font-bold"> ChatBot</Text>
        </Icon>
      </TouchableOpacity>
    </View>

    <ScrollView className="flex-1 h-full bg-white">
      <View className="flex-1 mt-7 bg-white">
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <Image
              source={images.logo7}
              resizeMode="contain"
              style={{ width: 300, height: 40 }}
            />
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <>
            {/* Chat messages */}
            <ScrollView className="flex-1 mx-2">
              {messages.map((message, index) => (
                <View
                  key={index}
                  className={`flex-row ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  {/* Avatar and Message */}
                  {message.sender === "system" && (
                    <View className="flex-row mr-10">
                      <Image
                        source={images.chatbot} // Replace with actual system avatar
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <View className="p-2 rounded-lg bg-gray-300 max-w-[80%]">
                        <Text className="text-black">{message.text}</Text>
                      </View>
                    </View>
                  )}
                  {message.sender === "user" && (
                    <View className="flex-row">
                      <View className="ml-2 p-2 rounded-lg bg-orange max-w-[85%]">
                        <Text className="text-white">{message.text}</Text>
                      </View>
                      <Image
                        source={images.user_avatar} // Replace with actual user avatar
                        className="w-10 h-10 rounded-full ml-2"
                      />
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>

            {/* Museum options (if museums are selected) */}
            {museumOptions.length > 0 && (
              <View className="mt-4 mx-4">
                <Text className="text-center text-lg mb-2">
                  Select a museum to see details:
                </Text>
                {museumOptions.map((museumName, index) => (
                  <TouchableOpacity
                    key={index}
                    className="p-4 mb-2 bg-teal-500 rounded-lg"
                    onPress={() => handleMuseumClick(museumName)}
                  >
                    <Text className="text-white text-center">
                      {museumName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Options (shown only when they are visible) */}
            {optionsVisible && museumOptions.length === 0 && (
              <View className="mt-4 mx-4">
                <Text className="text-center text-lg mb-2">
                  How can I help you?
                </Text>
                {[
                  "Museums near me",
                  "Book a ticket",
                  "Know about a museum",
                  "Popular attractions",
                ].map((option) => (
                  <TouchableOpacity
                    key={option}
                    className="p-4 mb-2 bg-orange rounded-lg"
                    onPress={() => handleOptionPress(option)}
                  >
                    <Text className="text-white text-center">{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Pay Now Button */}
            {showPayNowButton && (
              <View className="items-center my-4">
                <TouchableOpacity
                  className="w-[70%] bg-orange p-3 rounded-lg"
                  onPress={handlePayment}
                >
                  <Text className="text-white text-center text-lg">
                    Pay Now
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>

    <View className="left-0 right-0 p-4 bg-white border-t border-gray-300">
      <View className="flex-row">
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          className="ml-2 p-2 bg-orange rounded-lg justify-center items-center"
        >
          <Text className="text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </View>

    <NavBar />
  </View>
);  
}
export default ChatPage;
