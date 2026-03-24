import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'trial-signups.json');

const ensureDataStore = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
  }
};

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const payload = req.body;

  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ error: 'Invalid payload.' });
  }

  ensureDataStore();

  const existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const entry = {
    id: `trial_${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...payload,
  };

  existing.push(entry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2), 'utf8');

  return res.status(201).json({ ok: true, id: entry.id });
}
