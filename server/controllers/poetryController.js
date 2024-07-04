const poetryDB = require('../models/poetryData');

async function getPoemData(req, res) {
    const { keyword } = req.query;
    const searchTerm = keyword || ''; // Default keyword if not provided

    try {
        const poetryResponse = await fetch(`${poetryDB.BASE_URL}/lines,random/${searchTerm};5`);
        if (!poetryResponse.ok) {
            throw new Error(`Error: ${poetryResponse.statusText}`);
        }
        const poetryData = await poetryResponse.json();

        if (poetryData && poetryData.length > 0) {
            let selectedPoem = null;
            let occurrencesCount = 0;

            poetryData.forEach((poem) => {
                const occurrences = (poem.lines.join(' ').match(new RegExp(searchTerm, 'gi')) || []).length;

                if (occurrences > occurrencesCount) {
                    occurrencesCount = occurrences;
                    selectedPoem = poem;
                }
            });

            if (selectedPoem) {
                return res.json({
                  weatherWord: searchTerm,
                  occurrences: occurrencesCount,
                  title: selectedPoem.title,
                  author: selectedPoem.author,
                  lines: selectedPoem.lines,
                });
            }
          }
        res.status(404).json({ error: 'Sorry, no poem found' });

    } catch (error) {
        console.error('Error fetching poem data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getPoemData };

