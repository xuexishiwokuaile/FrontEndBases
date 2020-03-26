Function.prototype.bind = function(){
    var self = this;
    var context = [].shift.call(arguments);
    var args = [].slice.call(arguments);
    return function(){
        self.apply(context,[].concat.call(args,[].slice.call(arugments)));
    }
}

Function.prototype.call = function(context){
    context.fn = this;
    var args=[];
    for(var i=1,len=arguments.length;i<len;i++)
    {
        args.push('arguments['+i+']');
    }
    var result = eval('context.fn('+args+')');
    delete context.fn;
    return result;
}

Function.prototype.apply = function(context){
    context.fn = this;
    var args=[];
    if(arguments[1])
    {
        for(var i=1,len=arguments.length;i<len;i++)
        {
            args.push('arguments[1]['+i+']');
        }
    }
    var result = eval('context.fn('+args+')');
    delete context.fn;
    return result;
}

function debounce(func,wait)
{
    var timeout;
    return function(){
        clearTimeout(timeout);
        timeout = setTimeout(func,wait);
    }
}

function throttle(func,wait,mustrun)
{
    var timeout,
    startTime = new Date();

    return function()
    {
        var context = this,
        args = arguments,
        curTime = new Date();

        clearTimeout(timeout);
        if(curTime-startTime>=mustrun)
        {
            func.apply(context,args);
            startTime = curTime;
        }
        else
        {
            timeout = setTimeout(func,wait);
        }
    }
}

function deepClone(obj)
{
    if(typeof obj !== 'object')
    {
        return obj;
    }
    if(!obj)
    {
        return obj;
    }
    if(obj instanceof Date)
    {
        return new Date(obj);
    }
    if(obj instanceof RegExp)
    {
        return new RegExp(obj);
    }
    if(obj instanceof Function)
    {
        return obj;
    }

    var newObj;
    if(obj instanceof Array)
    {
        newObj = [];
        for(let i=0,len=obj.length;i<len;i++)
        {
            newObj.push(deepClone(obj[i]));
        }
    }

    newObj={};
    for(let key in obj)
    {
        if(obj.hasOwnProperty(key))
        {
            if(typeof obj[key] !== 'object')
            {
                newObj[key] = obj[key];
            }
            else
            {
                newObj[key] = deepClone(obj[key]);
            }
        }
    }
    return newObj;
}

function myPromise(constructor)
{
    var self = this;
    self.status = "pending";
    self.value = undefined;
    self.reason = undefined;

    function resolve(value)
    {
        if(self.status === "pending")
        {
            self.value = value;
            self.status = "resolved"
        }
    }
    function reject(reason)
    {
        if(self.status === "pending")
        {
            self.reason = reason;
            self.status = "rejected";
        }
    }

    try
    {
        constructor(resolve,reject);
    }catch(e)
    {
        reject(e);
    }
}

myPromise.prototype.then = function(onFullfilled,onRejected)
{
    var self = this;
    switch(self.status)
    {
        case "resolved":
            onFullfilled(self.value);
            break;
        case "rejected":
            onRejected(self.reason);
            break;
        default:
    }
}

function sleep1(ms)
{
    var startTime = Date.now(),expire = startTime+ms;
    while(Date.now()<expire)
    {
        console.log("111");
    }
    return;
}

function sleep2(ms)
{
    var template = new Promise(function(resolve)
    {
        console.log(111);
        setTimeout(resolve,ms);//用resolve进入then
    });
    return template;
}

sleep2(100).then(function()
{
    console.log(222);
})

function sleep3(ms)
{
    return new Promise(function(resolve)
    {
        setTimeout(resolve,ms);
    });
}

async function result()
{
    var template = await sleep3(100);
    console.log(111);
}

function* sleep4(ms)
{
    yield new Promise(function(resolve)
    {
        setTimeout(resolve,ms);
    });
}
sleep4(100).next().value.then(function(){console.log(111)});

function uniq1(array)
{
    var temp = [];
    for(var i=0;i<array.length;i++)
    {
        if(temp.indexOf(array[i])==-1)
        {
            temp.push(array[i]);
        }
    }
}

function uniq2(array)
{
    var temp={},r=[],len=array.length,val,type;
    for(var i=0;i<len;i++)
    {
        val = array[i];
        type = typeof val;
        if(!temp[val])
        {
            temp[val] = [type];
            r.push(val);
        }
        else if(temp[val].indexOf(type)<0)
        {
            temp[val].push(type);
            r.push(val);
        }
    }
    return r;
}

function MaxNum(str)
{
    var a={};
    var b = str.split("");
    for(var i=0;i<b.length;i++)
    {
        if(a[b[i]])
            a[b[i]]++;
        else
            a[b[i]] = 1;
    }

    var maxLetter = "";
    var maxLevel = 0;
    for(let k in a)
    {
        if(a[k]>maxLevel)
        {
            maxLevel = a[k];
            maxLetter = k;
        }
    }
    return maxLetter;
}

function sumBigNumber(a, b) 
{
    var res = '',
      temp = 0;
    a = a.split('');
    b = b.split('');
    while (a.length || b.length || temp) {
      temp += ~~a.pop() + ~~b.pop();
      res = (temp % 10) + res;
      temp = temp > 9;
    }
    return res.replace(/^0+/, '');
}
