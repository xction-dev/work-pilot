type Video =  {
    id:string;
    children: string[];
    description:string;
}

export const videos:Video[] = [
    {id: "a", description:"", children:["b"]},
    {id: "b", description:"", children:["c", "d", "e"]},
    {id: "c", description:"", children:[]},
    {id: "d", description:"", children:["di", "dj", "dk"]},
    {id: "e", description:"", children:["ei", "ej"]},
    {id: "di", description:"", children:["dix", "diy"]},
    {id: "dj", description:"", children:[]},
    {id: "dk", description:"", children:[]},
    {id: "ei", description:"", children:["eix", "eiy"]},
    {id: "ej", description:"", children:[]},
    {id: "dix", description:"", children:[]},
    {id: "diy", description:"", children:[]},
    {id: "eix", description:"", children:[]},
    {id: "eiy", description:"", children:[]},
]