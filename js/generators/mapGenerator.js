var MapGenerator = {
    parse: function (json) {
        var geometry = new THREE.PlaneGeometry(json.width, json.height, 1, 1);
        var texture = THREE.ImageUtils.loadTexture(json.texture, THREE.RepeatWrapping, function() {
            Plotter.render();
        });
        // texture.repeat.set(10, 10);
        var material = new THREE.MeshLambertMaterial({
            map: texture,
            side: THREE.DoubleSide
        });
        var map = new THREE.Mesh(geometry, material);
        map.rotateOnAxis(new THREE.Vector3(1, 0, 0), -(Math.PI / 2));
        map.position.z += 0.01;
        return map;
    }
};
