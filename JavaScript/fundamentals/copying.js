"use strict";   // https://javascript.info/strict-mode

// SHALLOW
console.log("SHALLOW COPY")
direct: {
    let obj1 = {a: 1, b: 2};
    let obj2 = obj1;

    obj2.b = 5;
    obj1.a = 11;

    console.log("obj1.b:");
    console.log(obj1.b);
    console.log(obj2.b);
    
    console.log("obj1.a:");
    console.log(obj1.a);
    console.log(obj2.a);
}

spread_op: {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { ...obj1 };

    console.log("spread_op");
    obj2.b.c = 99;
    console.log(obj1.b.c); // 99 (nested ref shared)

    obj2.a = 23;
    console.log(obj1.a); // 99 (nested ref shared)
    console.log("spread_op");
}

obj_assign: {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = Object.assign({}, obj1);

    obj2.b.c = 88;
    console.log(obj1.b.c); // 88
}

// DEEP
console.log("\nDEEP COPY")
structuredClone: {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = structuredClone(obj1);

    obj2.b.c = 77;
    console.log(obj1.b.c); // 2 (independent ✅)
}

json: {
    const obj1 = { a: 1, b: { c: 55 } };
    const obj2 = JSON.parse(JSON.stringify(obj1));

    obj2.b.c = 66;
    console.log(obj1.b.c); // 2
}
