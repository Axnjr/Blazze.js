export default function (req, res) { let data; try { data = '1234567'; } catch (error) { data = error; }res.json({ mes: 'THIS IS A PATCH REQUEST HANDLER !@', data }); }
