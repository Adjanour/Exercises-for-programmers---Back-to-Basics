// document.addEventListener('DOMContentLoaded', function () {
//     const text = "Hello, this is Bernard"; 
//     let charIndex = 0;
//     const typingText = document.getElementById('typing-text');
  
//     function type() {
//       typingText.textContent += text[charIndex];
//       charIndex++;
//       if (charIndex < text.length) {
//         setTimeout(type, 100);
//       }
//       else{
//             erase();
//       }

//     }
//     function erase(){
//         if (charIndex > 0) {
//             setTimeout(function () {
//               typingText.textContent = text.substring(0,charIndex-1);
//               charIndex --;
//               erase();
//             }, 50); // Adjust the delay (milliseconds) as needed
//           }
//         else{
//             charIndex = 0;
//             type();
//         }
//     }
  
//     type();
//   });
  
document.addEventListener('DOMContentLoaded', function () {
    let charIndex = 0;
    const typingText = document.getElementById('typing-text');
    let count = 0;

    function typeAndErase(text, delay) {
        if (charIndex < text.length) {
            typingText.textContent += text[charIndex];
            charIndex++;
            //recursive call to typeAndErase
            setTimeout(() => typeAndErase(text, 100), 100); 
        } else {
            //recursive call to erase
            //when the text is typed, start erasing it
            setTimeout(() => erase(text), delay); 
        }
    }

    function erase(text) {
        //check if text is typed
        if (charIndex > 0) {
            //erase the text
            typingText.textContent = text.substring(0, charIndex - 1);
            charIndex--;
            //recursive call to erase
            setTimeout(() => erase(text), 50); 
        } else {
            //if the text is erased, start typing the next text
            charIndex = 0;
            const nextText = (count === 0) ? "Hello, this is Bernard" : "Hello, this is Kirk";
            //set delay to 1 second to simulate a pause after erasing
            setTimeout(() => typeAndErase(nextText, 1000), 1000);
            count = 1 - count; // Toggle between 0 and 1
        }
    }

    // Start directly with the deletion and subsequent text typing
    erase("");
});
