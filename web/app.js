// Function to show notification
function showToast(message) {
    let toast = document.createElement("div");

    toast.innerText = message;
    toast.style.background = "green";
    toast.style.color = "white";
    toast.style.padding = "15px";
    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.right = "20px";
    toast.style.borderRadius = "5px";

    document.body.appendChild(toast);

    setTimeout(function() {
        toast.remove();
    }, 3000);
}

// Smooth scrolling for Book Ticket links
document.querySelectorAll('a[href="#book-ticket"]').forEach(function(link) {

    link.addEventListener("click", function(event) {
        event.preventDefault();

        document.getElementById("book-ticket").scrollIntoView({
            behavior: "smooth"
        });

        showToast("Welcome to IPL Ticket Booking!");
    });

});