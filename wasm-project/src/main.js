(async () => {
  const codePromise = fetch('../out/main.wasm')
  const { instance } = await WebAssembly.instantiateStreaming(codePromise) // provide us to skip arrayBuffer() path when using WebAssembly.instatiate
  

  const buffer =new Uint8Array (instance.exports.memory.buffer) // an array with values [64674, 98659, 'H', 'E', 'L'...] gives everything

  const pointer = instance.exports.helloWorld() // gives only hello world

let string = ""
  for (let i = pointer; buffer[i]; ++i) {
    string += String.fromCharCode(buffer[i]) //since we do not have it as string we do have as number we need to convert
  }

  document.getElementById('container').textContent = string
})()
