// async function loadingDestinations() {
//   try {
//     const res = await fetch("destination.json"); // fetching destination data
//     const destinations_data = await res.json();

//     const respond = await fetch("accommodations.json"); // fetching accomodation data
//     const accomodations_data = await respond.json();

//     const personal_info_container = document.querySelector("#personal_info_container"); //personal info container
//     const passengers_inputs = document.querySelectorAll("input[name='numPassengers']"); //passengers radio inputs
//     const add_passenger_btn = document.querySelector("#add_passenger"); //add passenger button
//     const prix_container = document.querySelector("#prix");
    
    
//     /* CALLING VALIDATION INPUTS */
//     const Destination_select = document.querySelector("#destination"); //destination select element
//     const submitionBtn = document.querySelector('#SubmitBtn');
//     const accInput = document.querySelector('input[name="accommodation"]:checked');
//     const FirtNameInput = document.querySelector('#firstName');
//     const LastNameInput = document.querySelector('#lastName');
//     const EmailInput = document.querySelector('#email');
//     const PhoneInput = document.querySelector('#phone');
//     const DateInput = document.querySelector('#departureDate')


    
//     /*--------- price varibales ---------- */
//     let destinationPrice = 0;
//     let travelDuration = 0;
//     let PricePerDay = 0;

//     let passengers_count = 1; 
//     let prix_total = 0;

//     /* --------------------------------------- HANDLE DESTINATION CHANGE -----------------------------------------------------*/

//     const acc_container = document.querySelector("#accommodation_container"); //accomodation container
//     destinations_data.destinations.forEach((destination) => {
//       Destination_select.innerHTML += `<option data-price="${destination.price}" data-travelDays="${destination.travelDays}" value="${destination.id}">${destination.id}</option>`;
//     });

//     const accommodations_arr = accomodations_data.accommodations; //ACCOMODATION ARRAY



    
//     /*------------------------------------------------ HANDLE ACOOMODATION CHANGE ------------------------------- */

//     Destination_select.addEventListener("change", (e) => {
//       let optoin_destination = Destination_select.value; //destination value value
//       acc_container.innerHTML = ""; //clearing previous accomodation options

//       accommodations_arr.forEach((accomodation) => {
//         accomodation.availableOn.forEach((acc_dest) => {
//           if (acc_dest === optoin_destination) {
//             const isChecked = accomodation.id === "luxury"? "checked" : "";          //checked by default
//             acc_container.innerHTML += `
//                 <div class="acc${accomodation.id}">
//                     <label class="block cursor-pointer rounded-lg border-2 border-slate-700 bg-slate-800/50 hover:border-cyan-500/50 p-6 transition-all duration-200 h-full">
//                     <input type="radio" name="accommodation" id="${accomodation.id}" value="${accomodation.pricePerDay}" class="sr-only peer"  ${isChecked}>
//                     <h3 class="text-cyan-400 font-semibold mb-2 text-base sm:text-lg"> ${accomodation.name}</h3>
//                     <p class="text-gray-400 text-sm">${accomodation.description}</p>
//                     </label>
//                 </div>
//                     `;
//           }
//         });
//       });
//     });

// /*-----------------------------------------------------------------------------------------------------------------------------------*/






//     // /* ----------------------------------------Handle Passengers number change-----------------------------------------------------*/

//     add_passenger_btn.addEventListener("click", () => {
//       passengers_count++;
//       GenerateForms(); // call GenerateForms after the passanger_counr change (by clicking the add button)
//       CalculateTotalPrice();
//       console.log(passengers_count);
//     });

//     passengers_inputs.forEach((input) => {
//       input.addEventListener("change", () => {
//         switch (input.value) {
//           case "solo":
//             passengers_count = 1;
//             add_passenger_btn.classList.remove("visible");
//             break;
//           case "couple":
//             passengers_count = 2;
//             add_passenger_btn.classList.remove("visible");
//             break;
//           case "group":
//             passengers_count = 3;
//             add_passenger_btn.classList.add("visible");
//             break;
//           default:
//             passengers_count = 1;
//         }
//         GenerateForms(); // call GenerateForms after the passanger_count change
//         CalculateTotalPrice();
//         console.log(passengers_count);
//       });
//     });

//     function GenerateForms() {
//       personal_info_container.innerHTML = ""; //clearing previous personal info forms (by changing the radio input value)
//       for (let i = 1; i <= passengers_count; i++) {
//         personal_info_container.innerHTML += `
//                     <div id="passenger${i}">
//                         <span>Passenger : ${i}</span>
//                         <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             <div>
//                                 <label for="firstName" class="block text-gray-300 mb-2 text-sm">
//                                     First Name
//                                 </label>
//                                 <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" class="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition" required>
//                             </div>
//                             <div>
//                                 <label for="lastName" class="block text-gray-300 mb-2 text-sm">
//                                     Last Name
//                                 </label>
//                                 <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" class="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition" required>
//                             </div>
//                         </div>

//                         <!-- Email and Phone -->
//                         <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             <div>
//                                 <label for="email" class="block text-gray-300 mb-2 text-sm">
//                                     Email Address
//                                 </label>
//                                 <input type="email" id="email" name="email" placeholder="Enter your email" class="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition" required>
//                             </div>
//                             <div>
//                                 <label for="phone" class="block text-gray-300 mb-2 text-sm">
//                                     Phone Number
//                                 </label>
//                                 <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" class="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition" required>
//                             </div>
//                         </div>

//                         <!-- Special Requirements -->
//                         <div>
//                             <label for="specialRequirements" class="block text-gray-300 mb-2 text-sm">
//                                 Special Requirements
//                             </label>
//                             <textarea id="specialRequirements" name="specialRequirements" rows="4" placeholder="Any special requirements or notes..." class="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition resize-none"></textarea>
//                         </div>
//                     </div>
//                 </div>
//         `;
//       }
//     }


//     /*-------------------------------------------------- REGEX & VALIDATION ---------------------------------------------------------------------- */
//     const NameRegex = /^[A-Za-z]{3,20}$/;
//     const EmailRegex = /^\w+@\w+\.\w+$/;
//     const PhoneRegex = /^{+212}\s+0[6-7]\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}\s?$/;
    
//     function FormValidation(input, regex, errorMsg){
//         if(regex.test(input.value)){
//             input.classList.remove('focus:border-cyan-400');
//             input.classList.add('focus:border-red-400');
//             alert(errorMsg);
//             //Error.textContent = errorMsg;
//             return false;
//         }else {
//             input.classList.remove('focus:border-red-400');
//             input.classList.add('focus:border-cyan-400');
//             return true;
//         }
//     }

//     //VALIDATION WHILE TYPING
//     FirtNameInput.addEventListener('input', () => {FormValidation(FirtNameInput, NameRegex, "invalid Name");})
//     LastNameInput.addEventListener('input', () => {FormValidation(LastNameInput, NameRegex, "invalid Name");})
//     EmailInput.addEventListener('input', () => {FormValidation(EmailInput, EmailRegex, "invalid Name");})
//     PhoneInput.addEventListener('input', () => {FormValidation(FirtNameInput, PhoneRegex, "invalid Name");})

//     submitionBtn.addEventListener('click', () => {
//         if (BookingValidation()) {
//             alert("success");
//         } else {
//             alert("your reservation is not valid");
//         }

//     })

//     /*-------------------------------------------------- Calculate the Total Price --------------------------------------------------- */
//     document.addEventListener("change", function (e) {
//       // get the accomodation price per day
//       if (e.target.name === "accommodation") {
//         PricePerDay = e.target.value;
//         const accId = e.target.id;
//         console.log("Price per day:", PricePerDay);
//         console.log("Selected ID:", accId);
//         CalculateTotalPrice();
//       }
//     });

//     document.addEventListener("change", function (e) {
//       // get the destination TravelDuration and Price
//       if (e.target.name === "destination") {
//         const selectedOption = e.target.selectedOptions[0];
//         let destinationID = selectedOption.value;
//         travelDuration = parseInt(selectedOption.dataset.traveldays);
//         destinationPrice= parseFloat(selectedOption.dataset.price);

//         console.log("destination's ID :", destinationID);
//         console.log("destination's price :", destinationPrice);
//         console.log("travel duration :", travelDuration);
//         CalculateTotalPrice();
        
//       }
//     });

//     function CalculateTotalPrice(){
//         //let TotalPrice = 0;
//         prix_total = parseFloat(travelDuration * 2 * PricePerDay * passengers_count + destinationPrice);
//         prix_container.innerHTML = prix_total;
//         console.log(prix_total); 
//     }
// /*----------------------------------------------------------------------------------------------------------------------------- */




//   } catch (error) {
//     console.error("error loading data", error);
//   }
// }
// loadingDestinations();


async function loadingDestinations() {
  try {
    const res = await fetch("destination.json"); // fetching destination data
    const destinations_data = await res.json();

    const respond = await fetch("accommodations.json"); // fetching accomodation data
    const accomodations_data = await respond.json();

    const personal_info_container = document.querySelector("#personal_info_container"); //personal info container
    const passengers_inputs = document.querySelectorAll("input[name='numPassengers']"); //passengers radio inputs
    const add_passenger_btn = document.querySelector("#add_passenger"); //add passenger button
    const prix_container = document.querySelector("#prix");
    
    
    /* CALLING VALIDATION INPUTS */
    const Destination_select = document.querySelector("#destination"); //destination select element
    const submitionBtn = document.querySelector('#SubmitBtn');
    const DateInput = document.querySelector('#departureDate');

    /* CALLING SPAN ERRORS */
    const errorDest = document.querySelector('#errorDest');
    const errorDate = document.querySelector('#errorDate');
    const errorAccomodation = document.querySelector('#errorAccomodation');

    /*--------- price varibales ---------- */
    let destinationPrice = 0;
    let travelDuration = 0;
    let PricePerDay = 0;

    let passengers_count = 1; 
    let prix_total = 0;

    /* --------------------------------------- HANDLE DESTINATION CHANGE -----------------------------------------------------*/

    const acc_container = document.querySelector("#accommodation_container"); //accomodation container
    destinations_data.destinations.forEach((destination) => {
      Destination_select.innerHTML += `<option data-price="${destination.price}" data-travelDays="${destination.travelDays}" value="${destination.id}">${destination.id}</option>`;
    });

    const accommodations_arr = accomodations_data.accommodations; //ACCOMODATION ARRAY

    /*------------------------------------------------ HANDLE ACOOMODATION CHANGE ------------------------------- */
    Destination_select.addEventListener("change", (e) => {
      let optoin_destination = Destination_select.value; //destination value value
      acc_container.innerHTML = ""; //clearing previous accomodation options

      accommodations_arr.forEach((accomodation) => {
        accomodation.availableOn.forEach((acc_dest) => {
          if (acc_dest === optoin_destination) {
            const isChecked = accomodation.id === "luxury"? "checked" : "";          //checked by default
            acc_container.innerHTML += `
                <div class="acc${accomodation.id}">
                    <label class="block cursor-pointer rounded-lg border-2 border-slate-700 bg-slate-800/50 hover:border-cyan-500/50 p-6 transition-all duration-200 h-full">
                    <input type="radio" name="accommodation" id="${accomodation.id}" value="${accomodation.pricePerDay}" class="sr-only peer"  ${isChecked}>
                    <h3 class="text-cyan-400 font-semibold mb-2 text-base sm:text-lg"> ${accomodation.name}</h3>
                    <p class="text-gray-400 text-sm">${accomodation.description}</p>
                    </label>
                </div>
                    `;
          }
        });
      });
    });

    /* ----------------------------------------Handle Passengers number change-----------------------------------------------------*/

    add_passenger_btn.addEventListener("click", () => {
      passengers_count++;
      GenerateForms(); // call GenerateForms after the passanger_counr change (by clicking the add button)
      CalculateTotalPrice();
      console.log(passengers_count);
    });

    passengers_inputs.forEach((input) => {
      input.addEventListener("change", () => {
        switch (input.value) {
          case "solo":
            passengers_count = 1;
            add_passenger_btn.classList.remove("visible");
            break;
          case "couple":
            passengers_count = 2;
            add_passenger_btn.classList.remove("visible");
            break;
          case "group":
            passengers_count = 3;
            add_passenger_btn.classList.add("visible");
            break;
          default:
            passengers_count = 1;
        }
        GenerateForms(); // call GenerateForms after the passanger_count change
        CalculateTotalPrice();
        console.log(passengers_count);
      });
    });

    function GenerateForms() {
      personal_info_container.innerHTML = ""; //clearing previous personal info forms (by changing the radio input value)
      for (let i = 1; i <= passengers_count; i++) {
        personal_info_container.innerHTML += `
                    <div id="passenger${i}">
                        <span>Passenger : ${i}</span>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label for="firstName" class="block text-gray-300 mb-2 text-sm">
                                    First Name
                                </label>
                                <input type="text" id="firstName${i}" name="firstName" placeholder="Enter your first name" class="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition" required>
                            </div>
                            <div>
                                <label for="lastName" class="block text-gray-300 mb-2 text-sm">
                                    Last Name
                                </label>
                                <input type="text" id="lastName${i}" name="lastName" placeholder="Enter your last name" class="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition" required>
                            </div>
                        </div>

                        <!-- Email and Phone -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label for="email" class="block text-gray-300 mb-2 text-sm">
                                    Email Address
                                </label>
                                <input type="email" id="email${i}" name="email" placeholder="Enter your email" class="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition" required>
                            </div>
                            <div>
                                <label for="phone" class="block text-gray-300 mb-2 text-sm">
                                    Phone Number
                                </label>
                                <input type="tel" id="phone${i}" name="phone" placeholder="Enter your phone number" class="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition" required>
                            </div>
                        </div>

                        <!-- Special Requirements -->
                        <div>
                            <label for="specialRequirements" class="block text-gray-300 mb-2 text-sm">
                                Special Requirements
                            </label>
                            <textarea id="specialRequirements${i}" name="specialRequirements" rows="4" placeholder="Any special requirements or notes..." class="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition resize-none"></textarea>
                        </div>
                    </div>
                </div>
        `;
      }
    }

    /*-------------------------------------------------- REGEX & VALIDATION ---------------------------------------------------------------------- */
    const NameRegex = /^[A-Za-zÀ-ÿ\s']{2,50}$/;
    const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const PhoneRegex = /^[\+]?[0-9]{6,15}$/;
    
    // function FormValidation(input, regex, errorMsg){
    //     if(!regex.test(input.value)){
    //         input.classList.remove('focus:border-cyan-400');
    //         input.classList.add('focus:border-red-400');
    //         alert(errorMsg);
    //         return false;
    //     }else {
    //         input.classList.remove('focus:border-red-400');
    //         input.classList.add('focus:border-cyan-400');
    //         return true;
    //     }
    // }


    function FormValidation(input, regex, errorMsg){
    if(!regex.test(input.value)){
        input.classList.remove('border-cyan-400');
        input.classList.add('border-red-400');
        return false;
    } else {
        input.classList.remove('border-red-400');
        input.classList.add('border-cyan-400');
        return true;
    }
}

    function BookingValidation(){
      let isValid = true;

      if (!Destination_select.value){
        errorDest.textContent = "Please select a destination"
        isValid = false;
      }else {errorDest.textContent = "";}

      const accInput = document.querySelector('input[name="accommodation"]:checked');
      if (!accInput){
        errorAccomodation.textContent = "Please select an accommodation";
        isValid = false;
      } else {errorAccomodation.textContent = "";}

      const firstNames = document.querySelectorAll('input[name="firstName"]');
      const lastNames = document.querySelectorAll('input[name="lastName"]');
      const emails = document.querySelectorAll('input[name="email"]');
      const phones = document.querySelectorAll('input[name="phone"]');

      firstNames.forEach(input => { if(!FormValidation(input, NameRegex, "Invalid First Name")) isValid = false; });
      lastNames.forEach(input => { if(!FormValidation(input, NameRegex, "Invalid Last Name")) isValid = false; });
      emails.forEach(input => { if(!FormValidation(input, EmailRegex, "Invalid Email")) isValid = false; });
      phones.forEach(input => { if(!FormValidation(input, PhoneRegex, "Invalid Phone Number")) isValid = false; });

      return isValid;
    }

    submitionBtn.addEventListener('click', () => {
        if (BookingValidation()) {
            alert("success");
        } else {
            alert("your reservation is not valid");
        }
    });

    /*-------------------------------------------------- Calculate the Total Price --------------------------------------------------- */
    document.addEventListener("change", function (e) {
      // get the accomodation price per day
      if (e.target.name === "accommodation") {
        PricePerDay = e.target.value;
        const accId = e.target.id;
        console.log("Price per day:", PricePerDay);
        console.log("Selected ID:", accId);
        CalculateTotalPrice();
      }
    });

    document.addEventListener("change", function (e) {
      // get the destination TravelDuration and Price
      if (e.target.name === "destination") {
        const selectedOption = e.target.selectedOptions[0];
        let destinationID = selectedOption.value;
        travelDuration = parseInt(selectedOption.dataset.traveldays);
        destinationPrice= parseFloat(selectedOption.dataset.price);

        console.log("destination's ID :", destinationID);
        console.log("destination's price :", destinationPrice);
        console.log("travel duration :", travelDuration);
        CalculateTotalPrice();
      }
    });

    function CalculateTotalPrice(){
        prix_total = parseFloat(travelDuration * 2 * PricePerDay * passengers_count + destinationPrice);
        prix_container.innerHTML = prix_total;
        console.log(prix_total); 
    }

  } catch (error) {
    console.error("error loading data", error);
  }
}
loadingDestinations();