const FirebaseErrorMsg = message => {
    const removeFromMessage = message.substring(22, message.length-2) 
    const stringArr = removeFromMessage.split('-')
    const msg = stringArr.join(' ')
    return msg
};

export default FirebaseErrorMsg;