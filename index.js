<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FRONEXT-MD Pair Code</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
  <div class="container">
    <div class="box" id="box">
      <div id="text">
        <i class="fa fa-user"></i>
        <h3 class="centered-text">Link with Phone Number</h3>
        <h6>🔢 Enter your number with country code.</h6>
        <div class="input-container">
          <input placeholder="+947434xxxx" type="number" id="number">
          <button id="submit">Submit</button>
        </div>
        <div id="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <main id="pair"></main>
      </div>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.0.0-alpha.1/axios.min.js"></script>
  <script>
    const pairElement = document.getElementById("pair");
    const submitButton = document.getElementById("submit");
    const numberInput = document.getElementById("number");
    const box = document.getElementById("box");

    async function copyToClipboard() {
      const text = document.getElementById("copy").innerText.replace('CODE: ', '');
      await navigator.clipboard.writeText(text);
      document.getElementById("copy").innerText = "✔️ COPIED";
      setTimeout(() => {
        document.getElementById("copy").innerText = `CODE: ${text}`;
      }, 500);
    }

    submitButton.addEventListener("click", async (e) => {
      e.preventDefault();
      box.style.backgroundColor = "#000000"; // Change box color to dark green
      box.style.boxShadow = "0 0 40px rgba(0, 100, 0, 0.7)"; // Change box shadow to dark green
      if (!numberInput.value) {
        pairElement.innerHTML = '<span style="color:red;font-weight:bold">❗Enter your WhatsApp number with country code.</span>';
      } else if (numberInput.value.replace(/[^0-9]/g, "").length < 11) {
        pairElement.innerHTML = '<span style="color:red;font-weight:bold">❗Invalid number format. Please try again.</span>';
      } else {
        const number = numberInput.value.replace(/[^0-9]/g, "");
        numberInput.type = "text";
        numberInput.value = `+${number}`;
        numberInput.style.color = "white";
        numberInput.style.fontSize = "20px";

        document.getElementById("loading-spinner").style.display = "block";
        pairElement.innerHTML = '';

        try {
          const { data } = await axios.get(`/code?number=${number}`);
          const code = data.code || "❗ Service Unavailable";
          pairElement.innerHTML = `<font id="copy" onclick="copyToClipboard()" style="color:green;font-weight:monospace; display: block; margin-top: 30px;" size="5">CODE: <span style="color:white;font-weight:bold">${code}</span></font>`;
          pairElement.classList.add('code-animation'); // Add animation class
        } catch (error) {
          pairElement.innerHTML = `<span style="color:red;font-weight:bold">❗ Error retrieving code. Please try again later. - ${error}</span>`;
        } finally {
          document.getElementById("loading-spinner").style.display = "none";
        }
      }
    });
  </script>
</body>
</html>
