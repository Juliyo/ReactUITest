import Connection from "./Connection.js"
import SceneManager from "./SceneManager.js"
import ReactDynamicImport from "react-dynamic-import";

export default class CommandManager
{
    constructor()
    {
        this.command_queue = new Array();
        this.websocket = new Connection("127.0.0.1", "44552");
        this.file_reader = new FileReader();

        this.file_reader.onloadend      = this.new_command.bind(this);
        this.websocket.onmessage 		= this.onmessage.bind(this);

        this.timer = setInterval(
			() => this.handle_messages(),
			100
        );
        
        //  List of commands
        this.PUTSCENE				= "PutScene";
        this.SETPARAM				= "SetParameter";
    }

    onmessage(evt)
    {
        this.command_queue.push(evt.data);
    }

    handle_messages()
    {
        while(this.command_queue.length)
        {
            if(this.command_queue[0] instanceof Blob)
            {
                if(this.file_reader.readyState == this.file_reader.EMPTY || this.file_reader.readyState == this.file_reader.DONE)
                {
                    this.file_reader.readAsText(this.command_queue[0]);
				    this.command_queue.shift();	
                }
                	
            }
        }
    }

    new_command(command)
    {
        var message = command.target.result;

        if(message.length > 3)
        {
            var json = JSON.parse(message);
            console.log(json);
            //Cada escenario tendria un mapa con las variables de ese escenario
            //Si llega un escenario nuevo vaciamos el mapa y rellenamos variables
            //map["LINEA"]

            switch(json["order"])
            {
                case this.PUTSCENE:
                {
                  
                    const loader = () => import("./scene_components/" + json["scene"] + ".js");

                    loader().then(success => {
                        const SceneComponent = ReactDynamicImport({ loader });
                        SceneManager.put_scene(SceneComponent, json["Parameters"]);
                    }, error => { 
                        console.log(error); 
                    });

                    break;
                }
                case this.SETPARAM:
                {
                    //debugger;
                    break;
                }
            }
        }
        
    }
}