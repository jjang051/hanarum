<? include("../../include/subHeader.php"); ?>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ea629611f8c3785045c2782599cdf2a1&libraries=services"></script>
	<div class="message">
		<div class="main">
			<strong>한아름 산후조리원</strong>으로 <br>
				오시는 길입니다.
		</div>
	</div>


	<div id="map"></div>
	

	<table class="locationTable">
		<caption>오시는길</caption>
		<colgroup>
			<col width="20%">
			<col width="*%">
		</colgroup>
		<tbody>
			<tr>
				<th>ADDRESS</th>
				<td>강남구 개포동 1239-17,18 문화빌딩 5/6F 포이사거리(농협건물)</td>
			</tr>
			<tr>
				<th>TEL</th>
				<td>02-3412-0101,02-3412-0150</td>
			</tr>
			<tr>
				<th>FAX</th>
				<td>02-3412-0019</td>
			</tr>
			<tr>
				<th>대중교통 이용시</th>
				<td>
					양재역 5번 출구 또는 매봉역 4번 출구에서 지선(녹색)버스 4426/4433,마을버스 강남02/06번 탑승 후 포이사거리 하차
				</td>
			</tr>
		</tbody>
	</table>
	<script>
		var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		mapOption = {
			center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
			level: 3 // 지도의 확대 레벨
		};  

		// 지도를 생성합니다    
		var map = new daum.maps.Map(mapContainer, mapOption); 

		// 주소-좌표 변환 객체를 생성합니다
		var geocoder = new daum.maps.services.Geocoder();

		// 주소로 좌표를 검색합니다
		geocoder.addressSearch('강남구 개포동 1239-17 문화빌딩', function(result, status) {

			// 정상적으로 검색이 완료됐으면 
			if (status === daum.maps.services.Status.OK) {

				var coords = new daum.maps.LatLng(result[0].y, result[0].x);

				
				// 지도에 확대 축소 컨트롤을 생성한다
				var zoomControl = new daum.maps.ZoomControl();
				// 지도의 우측에 확대 축소 컨트롤을 추가한다
				map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
				// 마커 이미지의 주소
				var imageSrc = "../../images/contents/placeholder.svg", // 마커이미지의 주소입니다    
					imageSize = new daum.maps.Size(64, 69), // 마커이미지의 크기입니다
					imageOption = {offset: new daum.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
					  
				// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
				var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption),
					markerPosition = new daum.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다
				

				// 마커를 생성합니다
				var marker = new daum.maps.Marker({
					map: map,
					position: coords,
					image: markerImage // 마커이미지 설정 
				});

				// 마커가 지도 위에 표시되도록 설정합니다
				marker.setMap(map);  
				map.setCenter(coords);

				var content = '<div class="overlay">' +
							  '    <p class="addr">강남구 개포동 1239-17 문화빌딩 5/6F</p>' +
							  '    <p class="tel">TEL : 02-3412-0101,02-3412-0150</p>' +
							  '    <p class="title">한아름 산후 조리원</p>' +
							  '</div>';
				var customOverlay = new daum.maps.CustomOverlay({
					map: map,
					position: coords,
					content: content,
					yAnchor: 1 
				});
			} 
		});    
		
		
	</script>

<!-- 	411eb6ade56aa1dd129d116f71e7fac1 -->

<? include("../../include/subFooter.php"); ?>