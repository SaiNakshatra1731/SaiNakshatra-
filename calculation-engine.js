async function calculateAstrology(birthDetails) {
    try {
        const response = await fetch("/api/calculate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(birthDetails)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Calculation failed");
        }

        return data;

    } catch (error) {
        console.error("Astrology calculation error:", error);
        throw error;
    }
}
