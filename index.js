window.onload = function () {
	let
		oBox   = document.getElementById('box'),
		aPanel = Array.from(oBox.children),
		iWinW  = document.documentElement.clientWidth;

	// 每一个panel的宽度
	const PER_PANEL_WIDTH = 260;
	// 定义总列数
	let ALL_COLUMNS = Math.floor(iWinW / PER_PANEL_WIDTH);

	// 修改box的宽度
	oBox.style.width = ALL_COLUMNS * PER_PANEL_WIDTH + 'px';

	// 记录每一列的高度
	let aColH = [];

	//给每张图片指定位置
	aPanel.forEach(function (v, k) {
		if(k < ALL_COLUMNS) {
			v.style.top = 0;
			v.style.left = k * PER_PANEL_WIDTH + 'px';

			// 记录每一列的高度
			aColH.push(v.offsetHeight);
		} else {
			// 最矮的列高度
			var iMinH = Math.min(...aColH);
			// 最矮高度的下标
			var iMinK = aColH.indexOf(iMinH);


			// 设置下一个panel的位置
			v.style.top = iMinH + 'px';
			v.style.left = iMinK * PER_PANEL_WIDTH + 'px';

			// 更新列的高度
			aColH[iMinK] = iMinH + v.offsetHeight;
		}
	});

	// 添加滚动事件
	var bBtn = true;
	window.onscroll = function () {
		var iScrollT = document.documentElement.scrollTop || document.body.scrollTop;
		var iWinH    = document.documentElement.clientHeight;
		var oLastPanel = aPanel[aPanel.length - 1];

		if(bBtn && iScrollT + iWinH > oLastPanel.offsetTop + oLastPanel.offsetHeight / 2) {
			bBtn = false;
			// 加载新的数据
			aData.forEach(function (v) {
				var oDiv = document.createElement('div');
				oDiv.className = 'panel';

				var oImg = document.createElement('img');
				oImg.src = v.url;
				oImg.style.width = '220px';
				oImg.style.height = 220 * v.height / v.width + 'px';

				oDiv.appendChild(oImg);

				oBox.appendChild(oDiv);

				// 最矮的列高度
				var iMinH = Math.min(...aColH);
				// 最矮高度的下标
				var iMinK = aColH.indexOf(iMinH);

				// 设置下一个panel的位置
				oDiv.style.top = iMinH + 'px';
				oDiv.style.left = iMinK * PER_PANEL_WIDTH + 'px';

				// 更新列的高度
				aColH[iMinK] = iMinH + oDiv.offsetHeight;
			});

			// 更新数组
			aPanel = Array.from(oBox.children);

			// 打开按钮
			bBtn = true;
		}
	};

	// 浏览器窗口缩放，重新布局
	window.onresize = function () {
		iWinW  = document.documentElement.clientWidth;
		ALL_COLUMNS = Math.floor(iWinW / PER_PANEL_WIDTH);

		// 修改box的宽度
		oBox.style.width = ALL_COLUMNS * PER_PANEL_WIDTH + 'px';
		// 记录每一列的高度
		aColH = [];

		//给每张图片指定位置
		aPanel.forEach(function (v, k) {
			if(k < ALL_COLUMNS) {
				v.style.top = 0;
				v.style.left = k * PER_PANEL_WIDTH + 'px';

				// 记录每一列的高度
				aColH.push(v.offsetHeight);
			} else {
				// 最矮的列高度
				var iMinH = Math.min(...aColH);
				// 最矮高度的下标
				var iMinK = aColH.indexOf(iMinH);


				// 设置下一个panel的位置
				v.style.top = iMinH + 'px';
				v.style.left = iMinK * PER_PANEL_WIDTH + 'px';

				// 更新列的高度
				aColH[iMinK] = iMinH + v.offsetHeight;
			}
		});
	};
};