import { useState, useEffect } from 'react';
import axios from 'axios';

import type { ServerState } from '@_types/server_state.ts'

export default function CardPlayers({ address }) {
	const [state, setState] = useState<ServerState>({
		online: false
	});

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