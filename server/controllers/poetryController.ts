import { Request, Response } from 'express';
import poetryDB from '../models/poetryData';

interface Poem {
    title: string;
    author: string;
    lines: string[];
}

async function getPoemData(req: Request, res: Response): Promise<void> {
    const { keyword } = req.query;
    const searchTerm = (keyword as string) || ''; // Default keyword if not provided

    try {
        const poetryResponse = await fetch(`${poetryDB.BASE_URL}/lines,random/${searchTerm};5`);
        if (!poetryResponse.ok) {
            throw new Error(`Error: ${poetryResponse.statusText}`);
        }
        const poetryData: Poem[] = await poetryResponse.json();

        if (poetryData && poetryData.length > 0) {
            let selectedPoem: Poem | null = null;
            let occurrencesCount = 0;

            poetryData.forEach((poem: Poem) => {
                const occurrences = (poem.lines.join(' ').match(new RegExp(searchTerm, 'gi')) || []).length;

                if (occurrences > occurrencesCount) {
                    occurrencesCount = occurrences;
                    selectedPoem = poem;
                }
            });

            if (selectedPoem) {
                res.json({
                    weatherWord: searchTerm,
                    occurrences: occurrencesCount,
                    title: selectedPoem['title'],
                    author: selectedPoem['author'],
                    lines: selectedPoem['lines'],
                });
                return;
            }
        }
        res.status(404).json({ error: 'Sorry, no poem found' });

    } catch (error: any) {
        console.error('Error fetching poem data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { getPoemData };




