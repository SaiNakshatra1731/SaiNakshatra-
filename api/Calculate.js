export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const birth = req.body;

        const response = await fetch(
            "https://api.navamsha.in/api/v1/kundali/basic",
            {
                method: "POST",
                headers: {
                    "X-API-Key": process.env.NAVAMSHA_API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(birth)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data.output);

    } catch (error) {
        return res.status(500).json({
            error: "Astrology calculation failed"
        });
    }
}
