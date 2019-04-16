Collision = {
	N : 5,
	R : 20,
	width : 0,
	height : 0,
	circles : [],
	init : function init(width, height){ //初始化
		this.width = width;
		this.height = height;
		for(var i = 0; i < this.N; i++){
			var x = Math.random() * (width - 2 * this.R) + this.R;
			var y = Math.random() * (height - 2 * this.R) + this.R;
			var vx = Math.random() * 11 - 5;
			var vy = Math.random() * 11 - 5;
			this.circles[i] = {'x' : x, 'y' : y, 'vx' : vx, 'vy' : vy, 'filled' : false};
		}
	},
	run : function draw(g){ //绘制窗体
		var that = this;
		g.onclick = function(event){
			switch(event.type){
				case 'click':
					var x = event.pageX;
					var y = event.pageY;
					for(var i = 0; i < that.N; i++){
//						if(Math.pow(that.circles[i].x - x, 2) + Math.pow(that.circles[i].y - y, 2) <= Math.pow(that.R, 2)){		
//							that.circles[i].filled = that.circles[i].filled ? false : true;
//						}
						that.circles[1].filled = true;
					}
					break;
				default:
				break;
			}
		}
		setInterval(function() {
			var content = g.getContext('2d');
			g.height = g.height; // 重绘
			content.strokeRect(0, 0, g.width, g.height);
			for(var i = 0; i < that.N; i++){
				content.moveTo(that.circles[i].x + that.R, that.circles[i].y);
				content.arc(that.circles[i].x, that.circles[i].y, that.R, 0, 2 * Math.PI, false);
				that.circles[i].x += that.circles[i].vx;
				that.circles[i].y += that.circles[i].vy; 
				that.screenBoundOper(that.circles[i]);
				that.collisionOper();
				if(that.circles[i].filled){
					content.fillStyle = "#ff0000";
					content.fill();
				}
			}
			content.stroke();
		}, 50);
	},
	collisionOper : function(){ //碰撞检测
		for(var i = 0; i < this.circles.length; i++){
			for(var j = i + 1; j < this.circles.length; j++){
				if(this.crashed(this.circles[i], this.circles[j])){
					var crashPointX = (this.circles[i].x + this.circles[j].x) / 2;
					var crashPointY = (this.circles[i].y + this.circles[j].y) / 2;
					this.ballBoundOper(this.circles[i], crashPointX, crashPointY);
					this.ballBoundOper(this.circles[j], crashPointX, crashPointY);
				}
			}
		}
	},
	screenBoundOper : function(obj){ //如果碰壁，改变速度
		if(obj.x - this.R <= 0 || obj.x + this.R >= this.width){
			//防止小球过多进入边缘造成边缘卡住现象
			obj.x = obj.x - this.R <= 0 ? this.R : this.width - this.R; 
			obj.vx = - obj.vx;	
		}
		if(obj.y - this.R <= 0 || obj.y + this.R >= this.height){
			//防止小球过多进入边缘造成边缘卡住现象
			obj.y = obj.y - this.R <= 0 ? this.R : this.height - this.R; 
			obj.vy = - obj.vy;	
		}
	},
	ballBoundOper : function(obj, crashPointX, crashPointY){ //如果碰球，改变速度
		obj.vx = obj.x > crashPointX ? Math.abs(obj.vx) : -Math.abs(obj.vx);
		obj.vy = obj.y > crashPointY ? Math.abs(obj.vy) : -Math.abs(obj.vy);
		
	},
	crashed : function(obj1, obj2){
		return Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2) <= Math.pow(this.R << 1, 2);
	}
};
