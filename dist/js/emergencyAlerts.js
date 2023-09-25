document.addEventListener("click", function (eventClick) {
    if (eventClick.target.id !== "alerts") return;

    fetch(`https://api.weather.gov/alerts/active?area=WI`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => weatherAlerts(data))
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
});

function weatherAlerts(data) {
    const effectiveElement = document.getElementById("effective");
    const categoryElement = document.getElementById("category");
    const severityElement = document.getElementById("severity");
    const certaintyElement = document.getElementById("certainty");
    const urgencyElement = document.getElementById("urgency");
    const eventElement = document.getElementById("event");
    const headlineElement = document.getElementById("headline");
    const descriptionElement = document.getElementById("description");
    const instructionElement = document.getElementById("instruction");
    const responseElement = document.getElementById("response");
    effectiveElement.innerHTML = data.effective;
    categoryElement.innerHTML = data.category;
    severityElement.innerHTML = data.severity;
    certaintyElement.innerHTML = data.certainty;
    urgencyElement.innerHTML = data.urgency;
    eventElement.innerHTML = data.event;
    headlineElement.innerHTML = data.headline;
    descriptionElement.innerHTML = data.description;
    instructionElement.innerHTML = data.instruction;
    responseElement.innerHTML = data.response;
}