.env представляет собой файл конфигурации, используемый для хранения переменных среды. Переменные среды — это значения, которые можно использовать в приложении для управления его поведением в зависимости от среды, в которой оно выполняется.

Например, у вас может быть среда разработки и производственная среда, и вы можете захотеть использовать разные настройки для каждой среды. Сохраняя эти настройки в переменных среды, вы можете легко переключаться между средами, не изменяя код.

API_KEY=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


import pkg from 'admin-bro-expressjs';
const { buildRouter } = pkg;


const buildAdminRouter = (admin) => {
    const router = buildRouter(admin);
    return router;
};
export { buildAdminRouter };