const OpenAI = require("openai");

const openai = new OpenAI({
	apiKey: ""
})

const runPrompt = async (input) => {
	const prompt = `Interpret the entered data delimited by triple quotes and transform it into JSON with the following key/value properties: { dsc: string; val: int; }
The value should be an integer to represent a currency value, for example: 20.99 should be 2099.
If there is more than one output, return an array of JSONs.
Examples:
Input: supermercado 15.90
Output: { desc: "supermercado", val: 1590 }
Input: guitar 110.90
Output: { desc: "guitar", val: 11090 }
Input: mcdonalds 59.90  supermercado R$11.30 wjoid 30.99
Output: [{ desc: "mcdonalds", val: 5990 }, { desc: "supermercado", val: 1130 }, { desc: "wjoid", val: 3099 }]
Input: headset 240.90 ifood 50 churrasco 39.90
Output: [{desc: "headset",  val: 24090 }, {desc: "ifood", val: 5000 }, {desc: "churrasco", val: 3990}]
Input: Data;Estabelecimento;Portador;Valor;Parcela
08/02/2024;FD*food.COM AGENCIA DE;VICTOR REIS;R$ 4,95;-
18/02/2024;Uno   *Noy   *TRIP;VICTOR REIS;R$ 14,88;-
29/01/2024;MYPASS;VICTOR REIS;R$ 89,90;-
Output: [{desc: "IFD*IFOOD.COM", val: 495}, {desc: "ybe *ybe *trip", val: 1488},  {desc: "TOTALPASS", val: 8990}
The output should not contains spaces or \\n, it should be a valid JSON or array of JSONs
"""${input}"""`;

	const response = await openai.chat.completions.create({
		messages: [{role: 'user', content: prompt}],
		model: "gpt-3.5-turbo",
	});
	const responseString = response.choices[0].message.content;
	const responseObject = JSON.parse(responseString);
	console.log(responseObject);
};

runPrompt(`10 JAN Ifd*Ifood 7,99
10 JAN Ifd*Bom Beef Burgers L 155,30
10 JAN Amazon 210,52
10 JAN Mercadolivre*Flavioxp 40,50`);
