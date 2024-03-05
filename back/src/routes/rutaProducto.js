import express from "express";

const rutaProduct = express.Router();

//LEER
rutaProduct.get("/leer", (req, res) => {
    req.getConnection((error, conexion) => {
        if (error) {
            res.status(500).json({ error: 'Error de conexion con la base de datos' });
        }
        conexion.query('SELECT * FROM productos', (err, datos) => {
            if (err) {
                res.status(400).json({ err: 'tabla no encontrada' });
            }
            res.send(datos);//EN ESTA LINEA SE COTIENE LOS DATOS DE LA BASE DE DATOS
        });
    });
});
//CREAR
rutaProduct.post("/crear", (req,res)=>{
    const codigo = req.body.codigo; 
    const nombre = req.body.nombre; 
    const descripcion = req.body.descripcion; 
    const fecha_compra = req.body.fecha_compra; 
    const valor_compra = parseFloat(req.body.valor_compra); 
    const proveedor = req.body.proveedor; 
    const consulta = "INSERT INTO productos (codigo, nombre, descripcion, fecha_compra ,valor_compra, proveedor) VALUES (?,?,?,?,?,?)"

    
    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'Error de conexion con la base de datos' });
        }
        conexion.query(consulta, [codigo,nombre,descripcion,fecha_compra,valor_compra,proveedor], (err, datos) => {
            if (err) {
                return res.status(400).json({ err: 'tabla no encontrada' });
            }
            res.status(200).json({mensaje: 'producto agregado satisfactoriamente'})
        });
    });
});
//ACTUALIZAR
rutaProduct.put("/actu",(req,res)=>{
    const codigo = req.body.codigo; 
    const nombre = req.body.nombre; 
    const descripcion = req.body.descripcion; 
    const fecha_compra = req.body.fecha_compra; 
    const valor_compra = parseFloat(req.body.valor_compra); 
    const proveedor = req.body.proveedor; 
    const id = parseInt(req.body.id);
    const consult = 'UPDATE productos SET codigo=?, nombre=?, descripcion=?, fecha_compra=? ,valor_compra=?, proveedor=? WHERE id=?';

    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'Error de conexion con la base de datos' });
        }
        conexion.query(consult,[codigo,nombre,descripcion,fecha_compra,valor_compra,proveedor,id], (err, datos) => {
            if (err) {
                return res.status(400).json({ err: 'tabla no encontrada' });
            }
            res.status(200).json({mensaje: 'producto actualizado satisfactoriamente'});
        });
    })    
});


//ELIMINAR
rutaProduct.delete("/eliminar/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    req.getConnection((error, conexion)=>{
        if (error){
            return res.status(500).json({ error: 'Error de conexion con la base de datos' });
        }
        conexion.query("DELETE FROM productos WHERE id=?", [id], (err, resultado)=>{
            if(err){
                return res.status(400).json({ err: 'Error en la operación de eliminación' }); // Cambié el mensaje para que sea más genérico
            }
            res.status(200).json({mensaje: 'Producto eliminado satisfactoriamente'});
        });
    });
});

export default rutaProduct;