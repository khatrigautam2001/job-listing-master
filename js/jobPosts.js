let userRef;
const jobContainer = document.querySelector("#jobsContainer");

const goDetailedPage=(index)=>{
	window.location.href = `jobs.html?${index}`;
}
const checkData =(data)=>{
	return data?data:"";
}
const createJobPost=(info, index)=>{
	return `
	<div class="single-post d-flex flex-row" >
							<div class="thumb">
								<img style="margin-right:25px;" src="img/post.png" alt="">									
							</div>
							<div class="details" style="flex:1">
								<div class="title d-flex flex-row justify-content-between">
									<div class="titles">
										<a href="jobs.html?${index+1}"><h4>${checkData(info.job_title)}</h4></a>
										<h6>${checkData(info.company_name)}</h6>					
									</div>
									<ul class="btns ml-auto">
										<li><a href="jobs.html?${index+1}">Apply</a></li>
									</ul>
								</div>
								<p>
									${checkData(info.job_desc).substr(0, 100)+' ...'}
								</p>
																	<h5>Job Nature: ${checkData(info.job_nature)}</h5>
								<h5>Batch: ${checkData(info.batch)}</h5>									
							</div>
						</div>`
}
const  getJobsData= async ()=>{
  
  
  try {
    userRef = await firebase.firestore().collection("jobPosts").orderBy("job_id", "asc").get();
    userRef.docs.map((doc, index) => {
      const info = doc.data();
      console.log(info);
      console.log(jobContainer);
      jobContainer.insertAdjacentHTML("afterbegin", createJobPost(info, index));
    })
  } catch (error) {
    console.log(error);
  }
 
}
getJobsData()


const filterJobPosts = (category)=> {

	jobContainer.innerHTML="";
    userRef.docs.map((item, index) => {
			if(category=='All'){
				jobContainer.insertAdjacentHTML("afterbegin", createJobPost(item.data(), index));
			}else{
			if(item.data().job_nature==category){
				jobContainer.insertAdjacentHTML("beforeend", createJobPost(item.data(), index));
			}}
		})
	try {
		const btn = document.getElementById('focusedBtn');
		btn.removeAttribute('id');
	} catch (error) {
		
	}
}