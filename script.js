const leagueCodes = {
    "england": "premier-league",
    "france": "ligue-1",
    "germany": "bundesliga",
    "italy": "serie-a",
    "spain": "laliga"
};

async function fetchData(countryCode, leagueCode) {
    const url = `https://livescore-football.p.rapidapi.com/soccer/league-table?country_code=${countryCode}&league_code=${leagueCode}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '929e25fdc2msh275bf5ae63b1ee0p187fa8jsnc9789185c07c',
            'X-RapidAPI-Host': 'livescore-football.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const standings = result.data.total;

        const tableBody = document.getElementById("standings");
        tableBody.innerHTML = ''; // Clear previous data
        standings.forEach((team, index) => {
            const row = tableBody.insertRow();
            const positionCell = row.insertCell(0);
            const teamCell = row.insertCell(1);
            positionCell.textContent = index + 1; // Position starts from 1
            teamCell.textContent = team.team_name;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.getElementById("leagueForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const countryCode = document.getElementById("countryCode").value;
    const leagueCode = leagueCodes[countryCode];
    fetchData(countryCode, leagueCode);
});

// Initial fetch
const initialCountryCode = "england"; // You can set any default country code here
const initialLeagueCode = leagueCodes[initialCountryCode];
fetchData(initialCountryCode, initialLeagueCode);
