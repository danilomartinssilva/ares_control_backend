import { faker } from '@faker-js/faker';
import { PrismaClient } from 'generated/prisma/client';

const prisma = new PrismaClient();

function generateValidPassword(): string {
  // Caracteres necessários: minúsculas, maiúsculas, especiais, dígitos
  const lower = faker.string.alpha({ length: 1, casing: 'lower' });
  const upper = faker.string.alpha({ length: 1, casing: 'upper' });
  const special = faker.helpers.arrayElement([
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
  ]);
  const digits = faker.string.numeric(1);

  // O restante dos 8 a 12 caracteres
  const remainingLength = faker.number.int({ min: 4, max: 8 });
  const remainingChars = faker.string.alphanumeric(remainingLength);

  // Combina e embaralha todos os caracteres para garantir o comprimento e as regras
  const characters = lower + upper + special + digits + remainingChars;

  // Garante que o comprimento seja no máximo 12 e embaralha
  return faker.helpers.shuffle(characters.split('')).join('').substring(0, 12);
}

/**
 * Gera um objeto de usuário que está em conformidade com o UserCreatePayloadRequest.
 * @returns Um objeto para criação de usuário no Prisma.
 */
function generateUserData() {
  const name = faker.person.fullName();
  const firstName = name.split(' ')[0];
  const lastName = name.split(' ')[1];

  return {
    // Campos do DTO: name, email, password, phone
    name: name,
    email: faker.internet.email({
      firstName,
      lastName,
      provider: 'example.com',
    }),
    password: generateValidPassword(), // Usamos a função de senha válida
    phone: '+55' + faker.string.numeric(10), // Exemplo de telefone BR
  };
}

/**
 * Gera um objeto de endereço que está em conformidade com o AddressCreatePayloadRequest.
 * @param {string} userId - O ID do usuário ao qual este endereço pertence.
 * @param {number} index - Índice para determinar o alias e o endereço padrão.
 * @returns Um objeto para criação de endereço no Prisma.
 */
function generateAddressData(userId: string, index: number) {
  const aliases = ['Casa', 'Trabalho', 'Férias', 'Entrega'];
  return {
    // Campos do DTO: street, city, state, zipCode, country, userId
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode('#####-###'), // Exemplo de CEP
    country: 'Brasil',
    userId: userId,

    alias: aliases[index] || faker.company.buzzNoun(),
    defaultAddress: index === 0,
  };
}

async function main() {
  console.log('Iniciando o processo de seeding...');

  // 1. Limpeza dos dados existentes (Opcional, mas recomendado para seeds)
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  console.log('Dados de usuários e endereços limpos com sucesso.');

  const USERS_COUNT = 20;
  const ADDRESSES_PER_USER = 3;
  const usersToCreate = [];

  // 2. Geração e Criação dos Usuários
  console.log(`Criando ${USERS_COUNT} usuários...`);
  for (let i = 0; i < USERS_COUNT; i++) {
    const userData = generateUserData();

    // ⚠️ ATENÇÃO: Se você estiver usando bcrypt ou outra função de HASH,
    // você deve aplicar o hash à senha AQUI antes de salvar,
    // ou garantir que seu código de criação de usuário no NestJS faz isso.
    // Para fins de SEED, estamos salvando a string gerada.

    usersToCreate.push(
      prisma.user.create({
        data: {
          ...userData,
        },
      }),
    );
  }

  const createdUsers = await prisma.$transaction(usersToCreate);
  console.log('Usuários criados com sucesso.');

  // 3. Geração e Criação dos Endereços
  const addressesToCreate = [];

  console.log(`Criando ${ADDRESSES_PER_USER} endereços para cada usuário...`);

  for (const user of createdUsers) {
    for (let j = 0; j < ADDRESSES_PER_USER; j++) {
      const addressData = generateAddressData(user.id, j);
      addressesToCreate.push(
        prisma.address.create({
          data: {
            ...addressData,
          },
        }),
      );
    }
  }

  await prisma.$transaction(addressesToCreate);
  console.log(
    `${createdUsers.length * ADDRESSES_PER_USER} endereços criados com sucesso.`,
  );

  console.log('Processo de seeding concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
