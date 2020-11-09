require('dotenv').config();

const bcrypt = require('bcrypt');
const db = require('../index');

const AREAS = [
  {
    name: 'Secretaría de Trabájo',
    agent: { role: 'Secretario de Trabajo', name: 'Cristian ayala' },
  },
  {
    name: 'Subsecretaría de Trabájo',
    agent: {
      role: 'SubSecretario de Trabajo',
      name: 'Cifuentes Dalotto Matías',
    },
  },
];

async function run() {
  await db.connect();

  const users = await db.user.find();

  if (users.length === 0) {
    const passwordHash = bcrypt.hashSync(process.env.ADMIN_DEFAULT_PWD, 10);
    const user = db.user({ name: 'admin', passwordHash });
    await user.save();
    console.log('DB admin user created!');
  }

  const Areas = await db.area.find();

  if (Areas.length === 0) {
    console.log('INICIAR AREAS');

    await Promise.all(
      AREAS.map(async (a) => {
        const area = await new db.area(a).save();
        console.log(area);
      })
    );
  }

  // const newArea = await area.save();

  // console.log('Area Seeer:', newArea);

  process.exit(0);
}

run();
