const OBA = require("oba-api");
const chalk = require("chalk");

function sanitizeOptionObject (options, page, rctx) {
	const customOptions = ["count", "filter", "log"];
	const safeOptions = Object.keys(options)
		.filter(key => !customOptions.includes(key))
		.reduce((obj, key) => {
			return {
				...obj,
				[key]: options[key]
			};
		}, {});
	if (rctx) safeOptions.rctx = rctx;
	if (page) safeOptions.page = page;
	return safeOptions;
}

function log (string, options) {
	if (options.log) console.log(string);
}

module.exports = class OBAWrapper {
	constructor (options) {
		this.client = new OBA(options);
		this.rctx = null;
	}

	async get (endpoint, options) {
		log(chalk.hex("#F0E02B")("Requesting..."), options);
		const results = [];
		let page = 1;
		while (results.length < options.count) {
			//Send out initial request
			const response = JSON.parse(await this.client.get(endpoint, sanitizeOptionObject(options, page++, this.rctx)));
			
			//Get context to speed up following requests.
			if (!this.rctx) this.rctx = response.aquabrowser.meta.rctx;

			//Make sure the API can actually provide the number of items the user requested
			const maxResults = Number(response.aquabrowser.meta.count);
			if (options.count > maxResults) {
				log(`${chalk.bold("Warning:")} Requested ${chalk.hex("#AE81FF")(options.count)} but only ${chalk.hex("#AE81FF")(maxResults)} available.`, options);
				options.count = maxResults;
			}

			//Check if user provided filter
			let __results = response.aquabrowser.results.result;
			if (options.filter) {
				__results = __results.filter(result => {
					return options.filter(result);
				});
			}

			//Push individual values to skip flattening later
			results.push(...__results);
		}

		//Cull any extra results
		if (results.length > options.count) results.length = options.count;

		//Reset context to allow other requests
		this.rctx = null;

		//Do some nice logging
		log(chalk.green("Succesfully returned")
			+ " "
			+ chalk.hex("#AE81FF")(results.length)
			+ " "
			+ chalk.green("items."), options);
		
		return results;
	}
}