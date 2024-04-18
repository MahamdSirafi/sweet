//1) crate file models

const readlineSync = require("readline-sync");
const fs = require("fs");
const path = require("path");
let field, allfield, properties, codeproperties, type, ref;
exports.crateModel = (createName) => {
  if (!fs.existsSync("./models")) {
    fs.mkdirSync("./models");
  }

  const fileNameModel = path.join("./models", createName + "Model" + ".js");
  let codeModel = `const mongoose = require("mongoose");
const ${createName}Schema = new mongoose.Schema({
  `;
  allfield = "";
  while (true) {
    field = "";
    properties = "";
    codeproperties = "";
    (type = ""), (ref = "");
    if (readlineSync.keyInYN("Do you want add filed to this model?")) {
      field = readlineSync.question("enter name field? ");
      // console.log(field);
      console.log(`Add a set of these properties to the field
required or r
unique or u`);
      properties = readlineSync.promptCL();
      properties.forEach((item) => {
        switch (true) {
          case /(required|r)/i.test(item): {
            codeproperties += codeproperties
              ? `\nrequired : [true , 'must enter ${field}'],`
              : `required : [true , 'must enter ${field}'],`;
            break;
          }
          case /(unique|u)/i.test(item): {
            codeproperties += codeproperties
              ? `\nunique : [true , '${field} must not repit'],`
              : `unique : [true , '${field} must not repit'],`;
            break;
          }
        }
      });
      type = readlineSync.question(`set type between
>String or s
>Array or a
>ObjectId or o
>Date or d
>Number or n
==> `);
      switch (true) {
        case /(String|s)/i.test(type): {
          codeproperties += codeproperties
            ? `\ntype : String,`
            : `type : String,`;
          break;
        }
        case /(Array|a)/i.test(type): {
          codeproperties += codeproperties
            ? `\ntype : Array,`
            : `type : Array,`;
          break;
        }
        case /(Date|d)/i.test(type): {
          codeproperties += codeproperties ? `\ntype : Date,` : `type : Date,`;
          break;
        }
        case /(Number|n)/i.test(type): {
          codeproperties += codeproperties
            ? `\ntype : Number,`
            : `type : Number,`;
          break;
        }
        case /(ObjectId|o)/i.test(type): {
          codeproperties += codeproperties
            ? `\ntype : mongoose.Schema.ObjectId,`
            : `type : mongoose.Schema.ObjectId,`;
          ref = readlineSync.question(`what is ref this field : `);
          codeproperties += codeproperties
            ? `\nref : '${ref}'`
            : `ref : '${ref}',`;
          break;
        }
      }
      field = `${field} : {
      ${codeproperties}
    },
    `;
      allfield += field;
    } else {
      break;
    }
  }
  codeModel += `${allfield}
},{
      timestamps: true
    });
    const ${
      createName[0].toUpperCase() + createName.slice(1)
    } = mongoose.model("${
    createName[0].toUpperCase() + createName.slice(1)
  }", ${createName}Schema);
    module.exports = ${createName[0].toUpperCase() + createName.slice(1)};
    `;
  console.log("Created successfully");

  fs.writeFileSync(fileNameModel, codeModel, "utf8");
};

// var userName = readlineSync.question("May I have your name? ");
// console.log("Hi " + userName + "!");
// var favFood = readlineSync.question('What is your favorite food? ', {
//   hideEchoBack: true // The typed text on screen is hidden by `*` (default).
// });
// console.log('Oh, ' + userName + ' loves ' + favFood + '!');

// if (readlineSync.keyInYN('Do you want this module?')) {
//   // 'Y' key was pressed.
//   console.log('Installing now...');
//   // Do something...
// } else {
//   // Another key was pressed.
//   console.log('Searching another...');
//   // Do something...
// }

// animals = ['Lion', 'Elephant', 'Crocodile', 'Giraffe', 'Hippo'],
// index = readlineSync.keyInSelect(animals, 'Which animal?');
// console.log('Ok, ' + animals[index] + ' goes to your room.');

//تنفيذ احدا التوابع
// readlineSync.promptCLLoop({
//   add: function(target, into) {
//     console.log(target + ' is added into ' + into + '.');
//     // Do something...
//   },
//   remove: function(target) {
//     console.log(target + ' is removed.');
//     // Do something...
//   },
//   bye: function() { return true; }
// });
// console.log('Exited');

// enter r u s
// argsArray = readlineSync.promptCL();
// readlineSync.promptCL(function(...p) {
//   console.log(p);
// });

// readlineSync.promptCL({
//   add: function(element) { // It's called by also "ADD", "Add", "aDd", etc..
//     console.log(element + ' is added.');
//   },
//   copy: function(from, to) {
//     console.log(from + ' is copied to ' + to + '.');
//   }
// _: function(command) { // command-name is included.
// console.log('Sorry, ' + command + ' is not available.');
// });
