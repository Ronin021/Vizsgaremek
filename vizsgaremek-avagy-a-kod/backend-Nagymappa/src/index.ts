import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('═══════════════════════════════════════');
  console.log(`✅ Server futtat a http://localhost:${PORT}`);
  console.log(`✅ API: http://localhost:${PORT}/api`);
  console.log('═══════════════════════════════════════');
  console.log('Ctrl+C-vel leállítható');
  console.log('');
});
