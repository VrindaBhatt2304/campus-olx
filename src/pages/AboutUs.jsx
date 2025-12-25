import React from "react";

export default function AboutUs() {

	return (
		<div className="min-h-screen bg-gray-100 font-sans">

			<section className="px-12 mt-12">
				<div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl p-14 text-white text-center">
					<h2 className="text-4xl font-bold mb-4">About CampusOLX</h2>
					<p className="text-lg opacity-90 mb-4">
						CampusOLX is your trusted campus marketplace for buying and selling used goods. We make it easy for students to find affordable essentials and give a second life to items you no longer need.
					</p>
					<p className="text-lg opacity-90 mb-4">
						Whether you’re looking for books, electronics, furniture, or hostel items, CampusOLX connects you with fellow students right on your campus. Our mission is to promote sustainability, affordability, and community among students.
					</p>
					<p className="text-lg opacity-90">
						Join us in making campus life easier, greener, and more connected!
					</p>
				</div>
			</section>

			<section className="px-12 mt-8">
				<div className="max-w-4xl mx-auto flex gap-3 flex-wrap justify-center">
					{["Books", "Electronics", "Furniture", "Cycles", "Hostel Items", "Others"].map((item, i) => (
						<button
							key={i}
							className="px-5 py-2 rounded-full bg-white border border-gray-300  text-gray-800 transition-all duration-300 hover:bg-gray-900 hover:text-white"
							disabled
						>
							{item}
						</button>
					))}
				</div>
			</section>

			<section className="px-12 py-12">
				<div className="max-w-4xl mx-auto">
					<h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Meet the Team</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[{
							name: "Vrinda Bhatt",
							role: "Founder & Developer",
							desc: "Passionate about building student communities and sustainable solutions."
						},
						{
							name: "Amit Patel",
							role: "UI/UX Designer",
							desc: "Designs intuitive and beautiful user experiences for students."
						},
						{
							name: "Priya Singh",
							role: "Marketing Lead",
							desc: "Spreads the word and connects students across campuses."
						}].map((member, idx) => (
							<div
								key={idx}
								className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300"
							>
								<div className="w-20 h-20 mx-auto rounded-full bg-gray-200 mb-4 flex items-center justify-center text-3xl text-gray-700">
									{member.name.charAt(0)}
								</div>
								<h4 className="font-semibold text-lg text-gray-900 mb-1">{member.name}</h4>
								<p className="text-gray-700 mb-2">{member.role}</p>
								<p className="text-sm text-gray-600">{member.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
