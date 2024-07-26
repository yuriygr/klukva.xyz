import { useState, useEffect } from 'react';
import axios from 'axios';

import type { ServerState } from '@_types/server_state.ts'

export default function Card({ address, defaultState }) {
	const [state, setState] = useState<ServerState>(defaultState);

	useEffect(() => {
		axios.get(`https://api.mcsrvstat.us/3/${address}`)
		.then(res => {
			setState(res.data)
		})

  }, []);

  return (
		<div className="server">
			{ state.online &&
			<>
					<div className="server__motd" dangerouslySetInnerHTML={{ __html: state.motd.html }} />
					<div className="server__playsers">
						<span className="online">{state.players.online}</span>
						/
						<span className="max">{state.players.max}</span>
					</div>
				</>
			}
		</div>
  );
}