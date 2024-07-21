

import { formidable } from 'formidable';
import fs from 'fs';
import mammoth from 'mammoth';
import pdf from 'pdf-parse';
import { summarizeText } from '../../utils/ai-service';



export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Error processing the file' });
        return;
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      let text = '';

      try {
        if (file.mimetype === 'text/plain') {
          text = fs.readFileSync(file.filepath, 'utf8');
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          const result = await mammoth.extractRawText({ path: file.filepath })
          text = result.value
        } else if (file.mimetype === 'application/pdf') {
          const dataBuffer = fs.readFileSync(file.filepath)
          const pdfResult = await pdf(dataBuffer)
          text = pdfResult.text
        } else {
          res.status(400).json({ error: 'Unsupported file type' })
          return
        }

        const summary = await summarizeText(text);
        res.status(200).json({ summary })
      } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ error: 'Error processing the file' });
      } finally {
        fs.unlinkSync(file.filepath);
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}