import { useEffect, useState } from "react";

export default function useDbQuery({ query }) {
	const [error, setError] = useState(null);
	const [results, setResults] = useState([]);

	useEffect(() => {
		if (query?.length) exec(query);
	}, []);

	function exec(sql) {
		try {
			// The sql is executed synchronously on the UI thread.
			// You may want to use a web worker here instead
			setResults(db.run(sql));
			setError(null);
		} catch (err) {
			setError(err);
			setResults([]);
		}
	}

	return {
		exec,
		error,
		results,
	};
}
