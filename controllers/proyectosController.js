exports.proyectosHome = (req, res) => {
    res.render("index"); //index -> nombre del archivo de la vista.
}

exports.nosotros = (req, res) => {
    res.send("Nosotros");
}