const fetchParticularPost = async () => {
  const jobQuery = parseInt(window.location.search.substring(1))-1;
  try {
    const userRef = await firebase.firestore().collection("jobPosts").orderBy("job_id", "asc").get();
userRef.docs.map((doc, index) => {
  if(index ==jobQuery){
    const jobPost = doc.data();
    getExactJobData(jobPost)
    console.log(jobPost);
  }})
  } catch (error) {
    console.log(error);
  }

}
fetchParticularPost();


const getExactJobData= (data)=>{
  console.log("getExactJobData isme hai.....")
  const checkData =(data)=>{
    return data?data:"";
  }
  
  const detailedJobInfo = document.getElementById('detailedJobInfo');
  detailedJobInfo.innerHTML = `
  
							<div class="single-post d-flex flex-row">
								<div class="thumb">
									<img src="img/post.png" alt="">									
								</div>
								<div class="details">
									<div class="title d-flex flex-row justify-content-between">
										<div class="titles">
											<a href="#"><h4>${checkData(data.job_title)}</h4></a>
											<h6>${checkData(data.company_name)}</h6>					
										</div>
										<ul class="btns">
											<li><a href="#"><span class="lnr lnr-heart"></span></a></li>
											<li><a href="${checkData(data.apply_link)}">Apply</a></li>
										</ul>
									</div>
									<p>
                  ${checkData(data.company_desc)}
									</p>
									<h5>Job Nature: ${checkData(data.job_nature)}</h5>
									<p class="address"><span class="lnr lnr-map"></span>${checkData(data.batch)}</p>
									<p class="address"><span class="lnr lnr-database"></span> 15k - 25k</p>
								</div>
							</div>	
							<div class="single-post job-details">
								<h4 class="single-title">Job Description</h4>
								<p>${checkData(data.job_desc)}</p>
							</div>							
							<div class="single-post job-experience">
								<h4 class="single-title">Eligibility Criteria</h4>
								<ul>
									<li>
                  ${checkData(data.eligibility)}
									</li>									
								</ul>
							</div>	
              <div class="single-post job-details">
								<h4 class="single-title">Last Date to register</h4>
								<p>${checkData(data.last_date)}</p>
							</div>																										
  `
}
