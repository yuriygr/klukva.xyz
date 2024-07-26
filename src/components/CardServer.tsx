export default function Card({ data }) {
  return (
		<div className="server">
			
			<pre>{JSON.stringify(data)}</pre>
			{ data.online &&
			<>
					<div className="server__motd">{data.motd.html}</div>
					<div className="server__playsers">
						<span className="online">{data.players.online}</span>
						/
						<span className="max">{data.players.max}</span>
					</div>
				</>
			}
		</div>
  );
}