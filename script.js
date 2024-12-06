function showDetail(parallel) {
    const details = {
        heart: "Le cœur de l'océan correspond aux courants marins. Ils régulent la température mondiale, comme le cœur pompe le sang.",
        lungs: "Les poumons de l'océan sont les organismes photosynthétiques, qui produisent une grande partie de l’oxygène de la planète.",
        skin: "La peau de l’océan est sa surface. Sa température et salinité influencent le climat mondial."
    };

    const detailText = document.getElementById("detail-text");
    detailText.textContent = details[parallel] || "Aucun détail disponible.";
}
