'use strict';
const path = require('path');
const refArray = require('ref-array');
let ref = require('ref');
let ffi = require('ffi');
let mydll = path.join(__dirname, '../dll/UhfReader_API_HID.dll');
let anyType = ref.types.void;
let pointer = ref.refType(anyType);

//设置path环境，解决DLL还有引用其他DLL文件，但是找不到引用的 DLL 文件。(Dynamic Linking Error: Win32 error 126)错误
process.env.PATH = `${process.env.PATH}${path.delimiter}C:\\work\\project\\node-dll\\dll`;
let scriptDLLObj = ffi.Library(mydll, {
    'UhfSearchHids': ['int', ['string']],
    'UhfReaderConnect': ['int', [pointer, 'string', 'int']],
    'UhfReaderDisconnect': ['int', [pointer, 'int']]
});
let serials = ref.alloc('string');//给字符串变量分配存储
let handle = ref.alloc(anyType, ref.NULL_POINTER);//给指针分配存储并赋值
console.log(scriptDLLObj.UhfSearchHids(serials)); //搜索HID的数量和序列号
console.log(scriptDLLObj.UhfReaderConnect(handle, '0065DD31', 0x05));//打开串口并与 RLM 建立链接
console.log(scriptDLLObj.UhfReaderDisconnect(handle, 1));//关闭 RLM 通信端口