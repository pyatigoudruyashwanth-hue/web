
function showToast(message) {

    const oldToast = document.querySelector(".toast-message");

    if (oldToast) {
        oldToast.remove();
    }

    let toast = document.createElement("div");

    toast.className = "toast-message";

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(function() {
        toast.remove();
    }, 3000);
}

document.querySelectorAll('a[href="#book-ticket"]').forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        document.getElementById("book-ticket").scrollIntoView({
            behavior: "smooth"
        });

        showToast("Welcome to IPL Ticket Booking!");

    });

});

const bookingForm = document.getElementById("bookingForm");

const matchSelect = document.getElementById("match");

const standSelect = document.getElementById("stand");

const quantityInput = document.getElementById("quantity");

function updateBookingSummary(showNotification = true) {

    if (!matchSelect || !standSelect || !quantityInput) {
        return;
    }

    const match = matchSelect.value;

    const stand = standSelect.value;

    const quantity = Number(quantityInput.value) || 0;

    const selectedOption =
        standSelect.options[standSelect.selectedIndex];

    const price = Number(selectedOption.dataset.price) || 0;

    const total = price * quantity;


    const summaryMatch = document.getElementById("summary-match");

    const summaryStand = document.getElementById("summary-stand");

    const summaryPrice = document.getElementById("summary-price");

    const summaryQuantity = document.getElementById("summary-quantity");

    const summaryTotal = document.getElementById("summary-total");


    if (summaryMatch) {
        summaryMatch.textContent =
            matchSelect.options[matchSelect.selectedIndex].text;
    }

    if (summaryStand) {
        summaryStand.textContent =
            standSelect.selectedIndex > 0 ? selectedOption.text : "Not selected";
    }

    if (summaryPrice) {
        summaryPrice.textContent = price;
    }

    if (summaryQuantity) {
        summaryQuantity.textContent = quantity;
    }

    if (summaryTotal) {
        summaryTotal.textContent = total;
    }


    if (showNotification) {
        showToast("Booking Summary Updated!");
    }

}

if (matchSelect) {

    matchSelect.addEventListener("change", function() {
        updateBookingSummary();
    });

}

if (standSelect) {

    standSelect.addEventListener("change", function() {
        updateBookingSummary();
    });

}

if (quantityInput) {

    quantityInput.addEventListener("input", function() {
        updateBookingSummary();
    });

}

function displayBookings() {

    const bookingsList = document.getElementById("bookings-list");

    if (!bookingsList) {
        return;
    }

    const bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

    bookingsList.innerHTML = "";


    if (bookings.length === 0) {

        bookingsList.innerHTML =
            '<tr><td colspan="9">No bookings yet.</td></tr>';

        return;

    }


    bookings.forEach(function(booking) {

        const row = document.createElement("tr");

        const details = [

            booking.id,
            booking.name,
            booking.email,
            booking.phone,
            booking.match,
            booking.stand,
            booking.quantity,
            booking.payment,
            "Rs. " + booking.total

        ];


        details.forEach(function(detail) {

            const cell = document.createElement("td");

            cell.textContent = detail;

            row.appendChild(cell);

        });


        bookingsList.appendChild(row);

    });

}
if (bookingForm) {

    bookingForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const phone = document.getElementById("phone").value.trim();

        const match = matchSelect.value;

        const stand = standSelect.value;

        const quantity = Number(quantityInput.value);

        const payment = document.getElementById("payment").value;


        const selectedOption =
            standSelect.options[standSelect.selectedIndex];

        const price = Number(selectedOption.dataset.price) || 0;


        const total = price * quantity;


        // Create new booking

        const newBooking = {

            id: "IPL" + Date.now(),

            name: name,

            email: email,

            phone: phone,

            match: matchSelect.options[matchSelect.selectedIndex].text,

            stand: selectedOption.text,

            quantity: quantity,

            payment: payment,

            total: total

        };


        const bookings =
            JSON.parse(localStorage.getItem("bookings")) || [];



        bookings.push(newBooking);


      

        localStorage.setItem("bookings", JSON.stringify(bookings));


        showToast("Booking saved successfully!");


        displayBookings();

        bookingForm.reset();

        updateBookingSummary(false);

    });

}
displayBookings();
updateBookingSummary(false);
// Mobile hamburger menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}

// Filter matches by team
const teamFilter = document.getElementById("teamFilter");
const matchCards = document.querySelectorAll(".match-card");

if (teamFilter) {
    teamFilter.addEventListener("change", function () {
        const selectedTeam = teamFilter.value;

        matchCards.forEach(function (card) {
            const teams = card.dataset.teams.split(" ");

            if (selectedTeam === "all" || teams.includes(selectedTeam)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// Switch between grid and list views
const matchContainer = document.getElementById("matchContainer");
const gridButton = document.getElementById("gridView");
const listButton = document.getElementById("listView");

if (matchContainer && gridButton && listButton) {
    gridButton.addEventListener("click", function () {
        matchContainer.classList.remove("list-view");
    });

    listButton.addEventListener("click", function () {
        matchContainer.classList.add("list-view");
    });
}
