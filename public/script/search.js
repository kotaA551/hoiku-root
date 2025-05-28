document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector("h2"); // 見出しをクリック対象に
    const regionContainer = document.querySelector(".re"); // 都道府県リスト

    // 初期状態では非表示
    regionContainer.style.display = "none";

    toggleBtn.addEventListener("click", function () {
        if (regionContainer.style.display === "none") {
            regionContainer.style.display = "block";
            regionContainer.style.opacity = "0";
            regionContainer.style.transition = "opacity 0.5s ease-in-out";
            setTimeout(() => {
                regionContainer.style.opacity = "1";
            }, 10);
        } else {
            regionContainer.style.opacity = "0";
            setTimeout(() => {
                regionContainer.style.display = "none";
            }, 500);
        }
    });
});
