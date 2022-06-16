
		$(document).ready(function(){
			var scene = new THREE.Scene();
			var margin = 125

			var frame_counter = 0
			var fov = 55;
			var aspect = window.innerWidth / window.innerHeight;
			var near = 1;
			var far  = 250;
			var font_round = 0
			var ani_array = []
			var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
						camera.position.z = 0
						camera.position.x = 0
						camera.position.y = 5
						camera.rotation.z = degrees_to_radians(0)
						camera.rotation.x = degrees_to_radians(0)
				// camera.rotation.x = degrees_to_radians(0)
				// camera.lookAt(0,5,0)
			var rot_counter = -10
			var angle_counter_ver = 0
			var camera_group = new THREE.Group()
				scene.add(camera_group)
				camera_group.add(camera)

				// camera_group.position.x = -10
			var angle_counter = 180
				camera_group.rotation.y = degrees_to_radians(angle_counter)

			var up = false
			var left = false
			var right = false
			var down = false			
			var look_up = false
			var look_down = false
			var speed = 1.0;
			var dir = new THREE.Vector3();

			let loader = new THREE.TextureLoader();

			var counter = 0

			var renderer = new THREE.WebGLRenderer({antialias:1, alpha: 1});
				renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
				renderer.setSize(window.innerWidth, window.innerHeight);
				renderer.domElement.classList.add('vignette');
				renderer.setClearColor(0xffffff, 0);
			document.getElementById('app-main').appendChild( renderer.domElement );

			var signage_image = [
				['0',0,0],
				['1.png',3*3,1.5*3],
				['2.png',8,4],
				['3',0,0],
				['4.png',3*3,2.63*3],
				['5.png',3*3,1.69*3],
				['6.png',3*3,1.03*3],
				['7',0,0],
				['8.png',3*3,2.23*3],
				['9.png',3*3,1.5*3],
				['10',0,0],
				['11.png',3*2,3.55*2],
				['12.jpg',3*2,4.24*2],
				['13',0,0],
				['14.jpg',3*2,4.24*2],
				['15.png',3*3,3*3],
				['16.jpg',3*2,4.24*2],
				['17.jpg',3*3,1.75*3],
				['18.png',3*2,5.3*2],
				['19.png',3*3,1.23*3],
				['20.png',3*2,3.1*2]
			]
			for (var i = signage_image.length - 1; i >= 0; i--) {
				if(signage_image[i][0].split('.').length>1){
								    var texture = loader.load( 'img/'+signage_image[i][0] );
								      	texture.wrapS = THREE.RepeatWrapping;
								      	texture.wrapT = THREE.RepeatWrapping;
								      	texture.repeat.set(1, 1);
										signage_image[i].push(texture)
									}else{
										signage_image[i].push('')
									}
			}

		    var alphabet_array = Array(260)
		    for (var i = 260; i >= 0; i--) {
		    	if(i<100){
			    alphabet_array[i] = loader.load( 'img/cha_new-'+paddy(i,2)+'.png' );
		    	}else{
			    alphabet_array[i] = loader.load( 'img/cha_new-'+i+'.png' );
		    	}
		    	alphabet_array[i].wrapS = THREE.RepeatWrapping;
		    	alphabet_array[i].wrapT = THREE.RepeatWrapping;
			    alphabet_array[i].repeat.set(1,1);
		    }

			function paddy(num, padlen, padchar) {
			    var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
			    var pad = new Array(1 + padlen).join(pad_char);
			    return (pad + num).slice(-pad.length);
			}
			var y = window.innerHeight/2
			var prev_fx = 0
			var prev_fz = 0
			function vis_ran(fx,fz){
	  				if(prev_fx== fx){}else{
		  				for (var i = z_pivot_array.length - 1; i >= 0; i--) {
			  				for (var k = x_pivot_array[i].length - 1; k >= 0; k--) {
			  					if(x_pivot_array[i][k]){x_pivot_array[i][k].visible=false}
			  				}
		  				}
		  				for (var i = margin - 1; i >= 0; i--) {
		  					if(z_pivot_array[-1*fz-i]){
				  				for (var k = margin - 1; k >= 0; k--) {
				  					if(x_pivot_array[-1*fz-i][-1*fx+k]){
				  						x_pivot_array[-1*fz-i][-1*fx+k].visible=true
				  					}
				  					if(x_pivot_array[-1*fz-i][-1*fx-k]){
				  						x_pivot_array[-1*fz-i][-1*fx-k].visible=true
				  					}
				  				}
		  					}
		  					if(z_pivot_array[-1*fz+i]){
				  				for (var k = margin - 1; k >= 0; k--) {
				  					if(x_pivot_array[-1*fz+i][-1*fx+k]){
				  						x_pivot_array[-1*fz+i][-1*fx+k].visible=true
				  					}
				  					if(x_pivot_array[-1*fz+i][-1*fx-k]){
				  						x_pivot_array[-1*fz+i][-1*fx-k].visible=true
				  					}
				  				}
		  					}
		  				}
		  				prev_fx = fx
	  				}
	  				if(prev_fz== fz){}else{
		  				for (var i = z_pivot_array.length - 1; i >= 0; i--) {
		  					z_pivot_array[i].visible=false
		  				}
		  				for (var i = margin - 1; i >= 0; i--) {
		  					if(z_pivot_array[-1*fz-i]){
		  						z_pivot_array[-1*fz-i].visible=true
		  					}
		  					if(z_pivot_array[-1*fz+i]){
		  						z_pivot_array[-1*fz+i].visible=true
		  					}
		  				}
		  				prev_fz = fz
	  				}
			}
			function onUpdate() {
				counter = counter + 0.25

				if(up){
					
					speed = 1
					camera_group.getWorldDirection( dir );
	  				group.position.addScaledVector( dir, speed );
	  				vis_ran(Math.floor(group.position.x),Math.floor(group.position.z))
			 	}
				if(down){
					
					speed = -1
					camera_group.getWorldDirection( dir );
	  				group.position.addScaledVector( dir, speed );
	  				for (var i = z_pivot_array.length - 1; i >= 0; i--) {
	  					z_pivot_array[i].visible=false
		  				for (var k = x_pivot_array[i].length - 1; k >= 0; k--) {
		  					if(x_pivot_array[i][k]){x_pivot_array[i][k].visible=false}
		  				}
	  				}
	  				for (var i = margin - 1; i >= 0; i--) {
	  					if(z_pivot_array[-1*Math.floor(group.position.z)-i]){
	  						z_pivot_array[-1*Math.floor(group.position.z)-i].visible=true
			  				for (var k = margin - 1; k >= 0; k--) {
			  					if(x_pivot_array[-1*Math.floor(group.position.z)-i][-1*Math.floor(group.position.x)+k]){
			  						x_pivot_array[-1*Math.floor(group.position.z)-i][-1*Math.floor(group.position.x)+k].visible=true
			  					}
			  					if(x_pivot_array[-1*Math.floor(group.position.z)-i][-1*Math.floor(group.position.x)-k]){
			  						x_pivot_array[-1*Math.floor(group.position.z)-i][-1*Math.floor(group.position.x)-k].visible=true
			  					}
			  				}
	  					}
	  					if(z_pivot_array[-1*Math.floor(group.position.z)+i]){
	  						z_pivot_array[-1*Math.floor(group.position.z)+i].visible=true
			  				for (var k = margin - 1; k >= 0; k--) {
			  					if(x_pivot_array[-1*Math.floor(group.position.z)+i][-1*Math.floor(group.position.x)+k]){
			  						x_pivot_array[-1*Math.floor(group.position.z)+i][-1*Math.floor(group.position.x)+k].visible=true
			  					}
			  					if(x_pivot_array[-1*Math.floor(group.position.z)+i][-1*Math.floor(group.position.x)-k]){
			  						x_pivot_array[-1*Math.floor(group.position.z)+i][-1*Math.floor(group.position.x)-k].visible=true
			  					}
			  				}

	  					}
	  				}
			 	}
				if(look_up){
					angle_counter_ver = angle_counter_ver+2

	  				if(5-angle_counter_ver/3<5){angle_counter_ver = angle_counter_ver-1}
	  				if(angle_counter_ver<-90){angle_counter_ver = angle_counter_ver-1}
					camera.fov = 55-angle_counter_ver/3
					camera.updateProjectionMatrix();
	  				camera.position.y = 5-angle_counter_ver/3
						camera.rotation.x = degrees_to_radians(angle_counter_ver)
			 	}
				if(look_down){
					angle_counter_ver = angle_counter_ver-2
	  				if(5-angle_counter_ver/3<5){angle_counter_ver = angle_counter_ver+1}
	  				if(angle_counter_ver<-90){angle_counter_ver = angle_counter_ver+1}
					camera.fov = 55-angle_counter_ver/3
					camera.updateProjectionMatrix();
	  				camera.position.y = 5-angle_counter_ver/3
						camera.rotation.x = degrees_to_radians(angle_counter_ver)
			 	}
				if(right){
					angle_counter = angle_counter-2
					camera_group.rotation.y = degrees_to_radians(angle_counter)
				}
				if(left){
					angle_counter = angle_counter+2
					camera_group.rotation.y = degrees_to_radians(angle_counter)
				}
				// for (var i = 200-1; i >= 0; i--) {
				// 	group.children[i].visible = true
				// }
	  				// var stage = Math.floor(Math.floor(group.position.z-300)/600)+1
				if(y < window.innerHeight/3*1){
					if(rot_counter>-30){
						rot_counter = rot_counter-1
					}else{
						rot_counter = -30
					}
				}else if(y < window.innerHeight/3*2){
					if(rot_counter>0){
						rot_counter = rot_counter-1
					}else if(rot_counter<0){
						rot_counter = rot_counter+1
					}else{
						rot_counter = 0
					}
				}else if(y < window.innerHeight/3*3){
					if(rot_counter<30){
						rot_counter = rot_counter+1
					}else{
						rot_counter = 30
					}
				}
				// camera.rotation.x = degrees_to_radians(rot_counter)
			}

			function render() {
				console.log(camera.position)
				frame_counter++
				requestAnimationFrame(render);
				if(key_pressed || !init_pressed){
								for (var i = ani_array.length - 1; i >= 0; i--) {
									var obj = ani_array[i][0]
									var animation_name = ani_array[i][1]
									var animation_speed = ani_array[i][2]
									var animation_easing = ani_array[i][3]
									var animation_start = ani_array[i][4]
									var animation_end = ani_array[i][5]
									if(animation_easing === 'easein'){
										var val = easeIn(Math.abs(animation_speed/2 - (frame_counter%animation_speed))/(animation_speed/2))*animation_speed/2
									}else if(animation_easing === 'easeout'){
										var val = easeOut(Math.abs(animation_speed/2 - (frame_counter%animation_speed))/(animation_speed/2))*animation_speed/2
									}else{
										var val = Math.abs(animation_speed/2 - (frame_counter%animation_speed))/(animation_speed/2)*animation_speed/2
									}
									if(animation_name === 'opacity'){
										obj.material.opacity = (animation_end - animation_start)/(animation_speed/2)*val
									}
									if(animation_name === 'rotateX'){
										obj.rotation.x = degrees_to_radians((animation_end - animation_start)/(animation_speed/2)*val)
									}
									if(animation_name === 'rotateY'){
										obj.rotation.y = degrees_to_radians((animation_end - animation_start)/(animation_speed/2)*val)
									}
									if(animation_name === 'rotateZ'){
										obj.rotation.z = degrees_to_radians((animation_end - animation_start)/(animation_speed/2)*val)
									}
									if(animation_name === 'scaleX'){
										obj.scale.x = degrees_to_radians((animation_end - animation_start)/(animation_speed/2)*val)
									}
									if(animation_name === 'scaleY'){
										obj.scale.y = degrees_to_radians((animation_end - animation_start)/(animation_speed/2)*val)
									}
									if(animation_name === 'scaleZ'){
										obj.scale.z = degrees_to_radians((animation_end - animation_start)/(animation_speed/2)*val)
									}
									if(animation_name === 'floor'){
										obj.position.y = (animation_end - animation_start)/(animation_speed/2)*val
									}
									// [obj , animation_name , animation_speed , animation_easing , animation_start , animation_end]
									// obj.material.opacity = 0.5
								}
							  	onUpdate();
								renderer.render(scene, camera);
							}
			}
			render();



function easeIn(x){
	return x * x;
}
function easeOut(x){
	return 1 - (1 - x) * (1 - x)
}





		function ch_to_tex(ch){
			// return 1
				 if(ch.toLowerCase() === 'a'){return font_round*26 + 1 }
			else if(ch.toLowerCase() === 'b'){return font_round*26 + 2 }
			else if(ch.toLowerCase() === 'c'){return font_round*26 + 3 }
			else if(ch.toLowerCase() === 'd'){return font_round*26 + 4 }
			else if(ch.toLowerCase() === 'e'){return font_round*26 + 5 }
			else if(ch.toLowerCase() === 'f'){return font_round*26 + 6 }
			else if(ch.toLowerCase() === 'g'){return font_round*26 + 7 }
			else if(ch.toLowerCase() === 'h'){return font_round*26 + 8 }
			else if(ch.toLowerCase() === 'i'){return font_round*26 + 9 }
			else if(ch.toLowerCase() === 'j'){return font_round*26 + 10}
			else if(ch.toLowerCase() === 'k'){return font_round*26 + 11}
			else if(ch.toLowerCase() === 'l'){return font_round*26 + 12}
			else if(ch.toLowerCase() === 'm'){return font_round*26 + 13}
			else if(ch.toLowerCase() === 'n'){return font_round*26 + 14}
			else if(ch.toLowerCase() === 'o'){return font_round*26 + 15}
			else if(ch.toLowerCase() === 'p'){return font_round*26 + 16}
			else if(ch.toLowerCase() === 'q'){return font_round*26 + 17}
			else if(ch.toLowerCase() === 'r'){return font_round*26 + 18}
			else if(ch.toLowerCase() === 's'){return font_round*26 + 19}
			else if(ch.toLowerCase() === 't'){return font_round*26 + 20}
			else if(ch.toLowerCase() === 'u'){return font_round*26 + 21}
			else if(ch.toLowerCase() === 'v'){return font_round*26 + 22}
			else if(ch.toLowerCase() === 'w'){return font_round*26 + 23}
			else if(ch.toLowerCase() === 'x'){return font_round*26 + 24}
			else if(ch.toLowerCase() === 'y'){return font_round*26 + 25}
			else if(ch.toLowerCase() === 'z'){return font_round*26 + 26}
			else{return 0}
		}


		var init_pressed = false	
		var key_pressed = false
					document.addEventListener('keydown',press)
					function press(e){
						$('.alert').fadeOut(300)
						$('.cursor_popup').fadeOut(300)
						key_pressed = true
						init_pressed = true
						if (e.keyCode === 38 /* up */ /* w */ || e.keyCode === 90 /* z */){
						up = true
						}
						if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
						right = true
						}
						if (e.keyCode === 40 /* down */ /* s */){
						down = true
						}
						if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */){
						left = true
						}
						if (e.keyCode === 87){
						look_up = true
						}
						if (e.keyCode === 83){
						look_down = true
						}

					}
					document.addEventListener('keyup',release)
					function release(e){
						if (e.keyCode === 38 /* up */ /* w */ || e.keyCode === 90 /* z */){
						up = false
						}
						if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
						right = false
						}
						if (e.keyCode === 40 /* down */ /* s */){
						down = false
						}
						if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */){
						left = false
						}
						if (e.keyCode === 87){
						look_up = false
						}
						if (e.keyCode === 83){
						look_down = false
						}
						if( up || right || down || left ||look_down||look_up){}else{key_pressed = false}
					}



		function componentToHex(c) {
			var hex = c.toString(16);
			return hex.length == 1 ? "0" + hex : hex;
		}
		function rgbToHex(r, g, b) {
			return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}





		var counter = 0
		var group = new THREE.Group()
			// 306*372
						// group.position.z = 186
						// -16
						group.position.x = -20
						group.position.z = 15
			scene.add(group);
    const near_m = 150;
    const far_m = 250;
    // const near = 10;
    // const far = 60;
    // scene.fog = new THREE.Fog(0x0091FF, near_m, far_m);
$(window).on('hashchange', function() {
  //.. work ..
});
if(window.location.hash) {
      var hash = window.location.hash.substring(1);
      if(hash === 'group1'){
      		group.position.z = 25
      }
      if(hash === 'group2'){
      		group.position.z = -75
      }
      if(hash === 'group3'){
      		group.position.z = -175
      }
      if(hash === 'group4'){
      		group.position.z = -275
      }
      if(hash === 'group5'){
      		group.position.z = -375
      }
      if(hash === 'group6'){
      		group.position.z = -475
      }
      if(hash === 'group7'){
      		group.position.z = -575
      }
      if(hash === 'group8'){
      		group.position.z = -675
      }
} else {
}
var z_pivot_array
var x_pivot_array
		get_data_array(0)
		function get_data_array(counter) {
		 	var xhttp = new XMLHttpRequest();
				if(counter==0){
				    // var texture = loader.load( 'https://www.google.es/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' );
				    var texture = loader.load( 'img/cha-00.png' );
				    texture.wrapS = THREE.RepeatWrapping;
				    texture.wrapT = THREE.RepeatWrapping;
				    texture.repeat.set(500, 500);
					const plane = new THREE.Mesh( new THREE.PlaneGeometry( 500, 500 ), new THREE.MeshBasicMaterial( {map:texture, side: THREE.DoubleSide} ) );
						plane.rotation.x=degrees_to_radians(90)
						plane.position.x = 0.5
						plane.position.y = 0
						scene.add(plane)
				}
		  	xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
					data_array1 = JSON.parse(this.responseText).values
					margin = Array(data_array1.length)
					console.log(data_array1.length)

					for (var j = 0; j< data_array1.length; j++) {
						if(j== data_array1.length-1){
							$('.loading').fadeOut(1000)
						}
						var linegroup = new THREE.Group()
							linegroup.position.z = j
							z_pivot_array[j] = linegroup
							x_pivot_array[j] = Array(data_array1[0].length)
								group.add(linegroup);
						for (var i = data_array1[0].length - 1; i >= 0; i--) {

								data_array1[j][i] = replaceAll(data_array1[j][i], ' ', '')
								data_array1[j][i] = replaceAll(data_array1[j][i], ':', '=')
								data_array1[j][i] = replaceAll(data_array1[j][i], 'https=//', 'https://')
								data_array1[j][i] = replaceAll(data_array1[j][i], 'http=//', 'http://')
								data_array1[j][i] = replaceAll(data_array1[j][i], '\n', '')

								
								if(data_array1[j][i].split('signage_').length>1){
									var value = parseInt(data_array1[j][i].split('signage_')[1].split('_')[0])
										var group00 = new THREE.Group()
										var bar1     = new THREE.Mesh(new THREE.BoxGeometry(0.25, 20+signage_image[value][2], 0.25), new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide}))
										var bar2     = new THREE.Mesh(new THREE.BoxGeometry(0.25, 20+signage_image[value][2], 0.25), new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide}))

										const geometry = new THREE.PlaneGeometry( signage_image[value][1], signage_image[value][2] );
											bar1.position.set(-1*signage_image[value][1]/2,0,0)
											bar2.position.set(signage_image[value][1]/2,0,0)
										const material = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map:signage_image[value][3]} );
										const plane = new THREE.Mesh( geometry, material );
											plane.position.set(0,10,0)
											plane.scale.x = -1
										group00.add(plane)
										group00.add(bar1)
										group00.add(bar2)
										group00.position.set(i-4,0,0)
											group00.rotation.y = degrees_to_radians(parseInt(data_array1[j][i].split('signage_')[1].split('_')[1]))
										linegroup.add(group00)
										// return false
								}else{
								for (var m = data_array1[j][i].split('}').length - 1; m >= 0; m--) {
									if(data_array1[j][i].split('}')[m].split('{')[0] === 'FALSE'){
									}else if(data_array1[j][i].split('}')[m].split('{')[0] === ''){
												// var obj     = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#ff0000' , side: THREE.DoubleSide}));
									}else{
										var shape = 'cube'
											shape = data_array1[j][i].split('}')[m].split('{')[0]
										var val = data_array1[j][i].split('}')[m].split('{')[data_array1[j][i].split('}')[m].split('{').length-1].split('}')[0]
										var color = '#ffffff'
										var skew = '0'
										var floor= '0'
										var rotateX= '0'
										var rotateY= '0'
										var rotateZ= '0'
										var scaleX = '1'
										var scaleY = '1'
										var scaleZ = '1'
										var opacity = '1'
										var image = ''
										var content = ' '
										var animation_name = ' '
										var animation_speed = '1s'
										var animation_easing = 'linear'
										var animation_start = ' '
										var animation_end = ' '
										var fontfamily = 'helvetica'
										if(data_array1[j][i].split('}')[m].split('{')[0] === 'TRUE'){
												var geometry = new THREE.BoxGeometry(1, 1, 1);
											    var texture = loader.load( 'img/cha-00.png' );
											    	texture.wrapS = THREE.RepeatWrapping;
											    	texture.wrapT = THREE.RepeatWrapping;
											    	texture.repeat.set(1, 1);
												var obj     = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: color ,map:texture, side: THREE.DoubleSide}));
										}else{
											for (var n = val.split(';').length - 1; n >= 0; n--) {
												if(val.split(';')[n].split('=')[0] ==='color'){
													if(val.split(';')[n].split('=')[1].split('#').length>1){
														color = val.split(';')[n].split('=')[1]
													}else if (val.split(';')[n].split('=')[1].split('rgb(').length>1){
														var color_pre = val.split(';')[n].split('=')[1].split('rgb(')[1].split(')')[0]
														if(color_pre.split(',').length>2){
															color = rgbToHex(parseInt(color_pre.split(',')[0]),parseInt(color_pre.split(',')[1]),parseInt(color_pre.split(',')[2]))
														}else{
															color = rgbToHex(255,255,255)
														}
													}
												}
												if(val.split(';')[n].split('=')[0] ==='floor'){
													floor = val.split(';')[n].split('=')[1]
												}
												if(val.split(';')[n].split('=')[0] ==='skew'){
													skew = val.split(';')[n].split('=')[1]
												}
												if(val.split(';')[n].split('=')[0] ==='rotateX'){
													rotateX = degrees_to_radians( parseFloat(val.split(';')[n].split('=')[1]))
												}
												if(val.split(';')[n].split('=')[0] ==='rotateY'){
													rotateY = degrees_to_radians( parseFloat(val.split(';')[n].split('=')[1]))
												}
												if(val.split(';')[n].split('=')[0] ==='rotateZ'){
													rotateZ = degrees_to_radians( parseFloat(val.split(';')[n].split('=')[1]))
												}
												if(val.split(';')[n].split('=')[0] ==='scaleX'){
													scaleX  = val.split(';')[n].split('=')[1]
												}
												if(val.split(';')[n].split('=')[0] ==='scaleY'){
													scaleY  = val.split(';')[n].split('=')[1]
												}
												if(val.split(';')[n].split('=')[0] ==='scaleZ'){
													scaleZ  = val.split(';')[n].split('=')[1]
												}
												if(val.split(';')[n].split('=')[0] ==='image'){
													image = val.split(';')[n].split('=')[1]
												}
												if(val.split(';')[n].split('=')[0] ==='content'){
													content = val.split(';')[n].split('=')[1]
												}
												if(val.split(';')[n].split('=')[0] ==='fontfamily'){
													fontfamily = val.split(';')[n].split('=')[1]
												}
												if(val.split(';')[n].split('=')[0] ==='opacity'){
													opacity = parseFloat(val.split(';')[n].split('=')[1],10)
												}
												if(val.split(';')[n].split('=')[0] ==='animation-name'){
													animation_name = val.split(';')[n].split('=')[1]
												}
												if(val.split(';')[n].split('=')[0] ==='animation-speed'){
													animation_speed = parseFloat(val.split(';')[n].split('=')[1].split('s')[0])*1000
												}
												if(val.split(';')[n].split('=')[0] ==='animation-easing'){
													animation_easing = val.split(';')[n].split('=')[1]
												}
												if(val.split(';')[n].split('=')[0] ==='animation-start'){
													animation_start = parseFloat(val.split(';')[n].split('=')[1])
												}
												if(val.split(';')[n].split('=')[0] ==='animation-end'){
													animation_end = parseFloat(val.split(';')[n].split('=')[1])
												}
											}

											//shape
											if(shape === 'cube'){
												var geometry = new THREE.BoxGeometry(1, 1, 1);
												var obj     = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: color }));
											}else if(shape === 'sphere'){
												var geometry = new THREE.SphereGeometry( 0.5, 10, 10 );
												var obj     = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: color }));
											}else if(shape === 'cone'){
												var geometry = new THREE.ConeGeometry( 0.5, 1, 10 );
												var obj     = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: color }));
											}else if(shape === 'dodecahedron'){
												var geometry = new THREE.DodecahedronGeometry( 0.5 );
												var obj     = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: color }));
											}else if(shape === 'icosahedron'){
												var geometry = new THREE.IcosahedronGeometry( 0.5 );
												var obj     = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: color }));
											}else if(shape === 'octahedron'){
												var geometry = new THREE.OctahedronGeometry( 0.5 );
												var obj     = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: color }));
											}else if(shape === 'cylinder'){
												var geometry = new THREE.CylinderGeometry( 0.5, 0.5, 1, 10);
												var obj     = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: color }));
											}else{
												var geometry = new THREE.BoxGeometry(1, 1, 1);
												var obj     = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: color }));
											}

											//skew
											var Syx = degrees_to_radians(parseInt(skew)),
											    Szx = 0,
											    Sxy = 0,
											    Szy = 0,
											    Sxz = 0,
											    Syz = 0;

											var matrix = new THREE.Matrix4();
											matrix.set(   1,   Syx,  Szx,  0,
											            Sxy,     1,  Szy,  0,
											            Sxz,   Syz,   1,   0,
											              0,     0,   0,   1  );
											geometry.applyMatrix( matrix );
											if(
												animation_name === 'opacity'||
												animation_name === 'rotateX'||
												animation_name === 'rotateY'||
												animation_name === 'rotateZ'||
												animation_name === 'scaleX'||
												animation_name === 'scaleY'||
												animation_name === 'scaleZ'||
												animation_name === 'floor'){
												var array = [obj , animation_name , animation_speed , animation_easing , animation_start , animation_end]
												ani_array.push(array)
											}else{
											}
											//font-family
											if(fontfamily === 'helvetica'){font_round = 0}
											if(fontfamily === 'futura'){font_round = 1}
											if(fontfamily === 'timesnewroman'){font_round = 2}
											if(fontfamily === 'arialround'){font_round = 3}
											if(fontfamily === 'acumincond'){font_round = 4}
											if(fontfamily === 'helvetica_inverted'){font_round = 5}
											if(fontfamily === 'futura_inverted'){font_round = 6}
											if(fontfamily === 'timesnewroman_inverted'){font_round = 7}
											if(fontfamily === 'arialround_inverted'){font_round = 8}
											if(fontfamily === 'acumincond_inverted'){font_round = 9}
											//content
											if(content===''||content===' '){
												var tex = alphabet_array[0]
											}else{
												var tex = alphabet_array[ch_to_tex(content)]
											}
											obj.material.map = tex
											obj.material.transparent = true;
											obj.material.opacity = opacity
											obj.material.side = THREE.DoubleSide;

											//scale
											obj.scale.set(scaleX,scaleY,scaleZ)

											//rotation
											obj.rotation.set(rotateX,rotateY,rotateZ)

										}
											obj.position.set(i-4,parseInt(floor)+scaleY/2,0)
											linegroup.add(obj)
											x_pivot_array[j][i] = obj

									}

								}

								}
							if(i==0 && j==data_array1.length-1){

				  				for (var i = z_pivot_array.length - 1; i >= 0; i--) {
				  					z_pivot_array[i].visible=false
					  				for (var k = x_pivot_array[i].length - 1; k >= 0; k--) {
					  					if(x_pivot_array[i][k]){x_pivot_array[i][k].visible=false}
					  				}
				  				}
				  				for (var i = margin - 1; i >= 0; i--) {
				  					if(z_pivot_array[-1*Math.floor(group.position.z)-i]){
				  						z_pivot_array[-1*Math.floor(group.position.z)-i].visible=true
						  				for (var k = margin - 1; k >= 0; k--) {
						  					if(x_pivot_array[-1*Math.floor(group.position.z)-i][-1*Math.floor(group.position.x)+k]){
						  						x_pivot_array[-1*Math.floor(group.position.z)-i][-1*Math.floor(group.position.x)+k].visible=true
						  					}
						  					if(x_pivot_array[-1*Math.floor(group.position.z)-i][-1*Math.floor(group.position.x)-k]){
						  						x_pivot_array[-1*Math.floor(group.position.z)-i][-1*Math.floor(group.position.x)-k].visible=true
						  					}
						  				}
				  					}
				  					if(z_pivot_array[-1*Math.floor(group.position.z)+i]){
				  						z_pivot_array[-1*Math.floor(group.position.z)+i].visible=true
						  				for (var k = margin - 1; k >= 0; k--) {
						  					if(x_pivot_array[-1*Math.floor(group.position.z)+i][-1*Math.floor(group.position.x)+k]){
						  						x_pivot_array[-1*Math.floor(group.position.z)+i][-1*Math.floor(group.position.x)+k].visible=true
						  					}
						  					if(x_pivot_array[-1*Math.floor(group.position.z)+i][-1*Math.floor(group.position.x)-k]){
						  						x_pivot_array[-1*Math.floor(group.position.z)+i][-1*Math.floor(group.position.x)-k].visible=true
						  					}
						  				}
				  					}
				  				}
							}else if(i==0 && j==data_array1[0].length-1){
							}
							}
						// }
						}
					}
			    }
			    if(link_array[counter]){
			    		  	xhttp.open("GET", "https://sheets.googleapis.com/v4/spreadsheets/"+link_array[counter]+"/values/Landscape?key=AIzaSyAmcp44cOi9-6XM4EqjCjIQLbj_D__1YPE");
			    			xhttp.send();
			    		}
		}
		function replaceAll(str, find, replace) {
		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
		}
		function escapeRegExp(string) {
		  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
		}
		function degrees_to_radians(degrees){
		    var pi = Math.PI;
		    return degrees * (pi/180);
		}

	})