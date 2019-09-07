
export default class Connection
{
    constructor(ip, port) 
	{
		this.ip = ip;
		this.port = port;
		
		//"ws://127.0.0.1:44552";
		this.web_socket = undefined;
		
		this.create_interval();
    }
	
	connect_web_socket()
	{
		if(this.web_socket == undefined || 
			(this.web_socket.readyState != this.web_socket.CONNECTING && this.web_socket.readyState != this.web_socket.OPEN))
		{
			//"ws://127.0.0.1:44552";
			this.web_socket = new WebSocket("ws://" + this.ip + ":" + this.port);
			
			this.web_socket.onopen 		= this.onopen.bind(this);
			this.web_socket.onerror 	= this.onerror.bind(this);
			this.web_socket.onclose 	= this.onclose.bind(this);
			this.web_socket.onmessage 	= this.onmessage.bind(this);
		}
		
	}

	create_interval()
	{
		this.timer = setInterval(
			() => this.connect_web_socket(),
			4000
		);
	}
	
	onclose()
	{
		console.log("Socket closed");
	}
	
	onerror()
	{
		console.log("Socket error");
	}
	
	onopen(evt)
	{
		console.log("Connection established with IP: " + this.ip);
	}
	
}