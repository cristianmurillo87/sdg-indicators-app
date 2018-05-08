import { Component, OnInit } from '@angular/core';
import { Goal} from "../goal";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

    goals = [
        {
            "id": "sdg1",
            "title": "No Poverty",
            "description": "End poverty in all its forms everywhere"
        },
        {
            "id": "sdg2",
            "title": "Zero Hunger",
            "description": "End hunger, achieve food security and improved nutrition and promote sustainable agriculture"
        },
        {
            "id": "sdg3",
            "title": "Good Health and Well-Being for people",
            "description": "Ensure healthy lives and promote well-being for all at all ages"
        },
        {
            "id": "sdg4",
            "title": "Quality Education",
            "description": "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all"
        },
        {
            "id": "sdg5",
            "title": "Gender Equality",
            "description": "Achieve gender equality and empower all women and girls"
        },
        {
            "id": "sdg6",
            "title": "Clean Water and Sanitation",
            "description": "Ensure availability and sustainable management of water and sanitation for all"
        },
        {
            "id": "sdg7",
            "title": "Affordable and Clean Energy",
            "description": "Ensure access to affordable, reliable, sustainable and modern energy for all"
        },
        {
            "id": "sdg8",
            "title": "Decent Work and Economic Growth",
            "description": "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all"
        },
        {
            "id": "sdg9",
            "title": "Industry, Innovation and Infrastructure",
            "description": "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation"
        },
        {
            "id": "sdg10",
            "title": "Reduced Inequalities",
            "description": "Reduce inequality within and among countries"
        },
        {
            "id": "sdg11",
            "title": "Sustainable Cities and Communities",
            "description": "Make cities and human settlements inclusive, safe, resilient and sustainable"
        },
        {
            "id": "sdg12",
            "title": "Responsible Consumption and Production",
            "description": "Ensure sustainable consumption and production patterns"
        },
        {
            "id": "sdg13",
            "title": "Climate Action",
            "description": "Take urgent action to combat climate change and its impacts"
        },
        {
            "id": "sdg14",
            "title": "Life Below Water",
            "description": "Conserve and sustainably use the oceans, seas and marine resources for sustainable development_"
        },
        {
            "id": "sdg15",
            "title": "Life on Land",
            "description": "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss"
        },
        {
            "id": "sdg16",
            "title": "Peace, Justice and Strong Institutions",
            "description": "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels"
        },
        {
            "id": "sdg17",
            "title": "Partnerships for the Goals",
            "description": "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development"
        }
    ];

  constructor() { }

  ngOnInit() {

  }

}
