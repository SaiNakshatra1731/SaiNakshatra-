export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { date, time } = req.body;

        if (!date || !time) {
            return res.status(400).json({
                error: "Date and time are required"
            });
        }

        const birthDate = new Date(`${date}T${time}:00`);

        const navamshaBirthData = {
            year: birthDate.getFullYear(),
            month: birthDate.getMonth() + 1,
            date: birthDate.getDate(),
            hours: birthDate.getHours(),
            minutes: birthDate.getMinutes(),

            // TEMPORARY TEST LOCATION: Patna, India
            latitude: 25.5941,
            longitude: 85.1376,
            timezone: 5.5
        };

        const response = await fetch(
            "https://api.navamsha.in/api/v1/kundali/basic",
            {
                method: "POST",
                headers: {
                    "X-API-Key": process.env.NAVAMSHA_API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(navamshaBirthData)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: data.error || "Navamsha API request failed",
                details: data
            });
        }

        return res.status(200).json(data.output);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Astrology calculation failed",
            details: error.message
        });
    }
}
