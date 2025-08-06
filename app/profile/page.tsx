'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { User, Mail, Phone, Calendar, MapPin, Award, Star, Edit, Eye, Trophy, Target, Users } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white border-b-4 border-pop-black">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-pop-green border-4 border-pop-black rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-pop-black helvetica-bold text-4xl">A</span>
              </div>
              <div>
                <h1 className="text-3xl helvetica-bold text-pop-black">Alex Martinez</h1>
                <p className="systematic-caps text-gray-600 mt-1">San Francisco, CA • Joined March 2023</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge className="bg-pop-green/10 text-pop-green border-pop-green">
                    <Trophy className="w-3 h-3 mr-1" />
                    Maker Level 3
                  </Badge>
                  <Badge className="bg-pop-blue/10 text-pop-blue border-pop-blue">
                    <Users className="w-3 h-3 mr-1" />
                    Operations Staff
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="systematic-caps border-2 border-pop-black hover:bg-pop-green hover:text-white">
                <Eye className="w-4 h-4 mr-2" />
                View Public Profile
              </Button>
              <Button className="systematic-caps bg-pop-green border-2 border-pop-black text-pop-black hover:bg-pop-black hover:text-pop-green">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Stats & Contact */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="border-2 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps text-pop-black">Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">alex.martinez@popcycle.io</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </CardContent>
            </Card>

            {/* Maker Stats */}
            <Card className="border-2 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps text-pop-black">Maker Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="systematic-caps text-sm text-gray-600">Projects Completed</span>
                  <span className="helvetica-bold text-xl text-pop-green">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="systematic-caps text-sm text-gray-600">Plastic Transformed</span>
                  <span className="helvetica-bold text-xl text-pop-blue">143 lbs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="systematic-caps text-sm text-gray-600">Skills Earned</span>
                  <span className="helvetica-bold text-xl text-pop-red">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="systematic-caps text-sm text-gray-600">Workshops Led</span>
                  <span className="helvetica-bold text-xl text-orange-600">8</span>
                </div>
              </CardContent>
            </Card>

            {/* Current Level Progress */}
            <Card className="border-2 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps text-pop-black flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="systematic-caps text-sm">Level 3 → 4</span>
                    <span className="systematic-caps text-sm text-gray-600">2,847 / 5,000 XP</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 border-2 border-pop-black">
                    <div className="bg-pop-green h-full rounded-full border-r-2 border-pop-black" style={{width: '57%'}}></div>
                  </div>
                  <p className="systematic-caps text-xs text-gray-600">2,153 XP to next level</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Columns - Activities & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Recent Projects */}
            <Card className="border-2 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps text-pop-black">Recent Projects</CardTitle>
                <CardDescription>Latest maker creations and assemblies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Office Desk Organizer', date: 'Jan 15, 2025', plastic: '2.3 lbs', status: 'Completed' },
                    { name: 'Phone Stand Set', date: 'Jan 12, 2025', plastic: '0.8 lbs', status: 'Completed' },
                    { name: 'Custom Planters', date: 'Jan 8, 2025', plastic: '4.1 lbs', status: 'In Progress' },
                    { name: 'Workshop Demo Kit', date: 'Jan 5, 2025', plastic: '1.5 lbs', status: 'Completed' },
                  ].map((project, index) => (
                    <div key={index} className="border-2 border-pop-black rounded-lg p-4 hover:bg-pop-green/5 transition-colors">
                      <div className="space-y-2">
                        <h4 className="helvetica-bold text-sm">{project.name}</h4>
                        <p className="systematic-caps text-xs text-gray-600">{project.date}</p>
                        <div className="flex justify-between items-center">
                          <span className="systematic-caps text-xs">Plastic: {project.plastic}</span>
                          <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'} className="systematic-caps text-xs">
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 systematic-caps border-2 border-pop-black hover:bg-pop-green hover:text-white">
                  View All Projects
                </Button>
              </CardContent>
            </Card>

            {/* Skills & Achievements */}
            <Card className="border-2 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps text-pop-black">Skills & Achievements</CardTitle>
                <CardDescription>Earned certifications and accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="systematic-caps font-medium text-pop-black mb-3">Recent Achievements</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { name: 'Workshop Leader', icon: '👨‍🏫', date: 'Jan 2025' },
                        { name: 'Level 3 Maker', icon: '🏆', date: 'Dec 2024' },
                        { name: '100 lbs Milestone', icon: '♻️', date: 'Nov 2024' },
                        { name: 'Community Helper', icon: '🤝', date: 'Oct 2024' },
                        { name: 'Precision Assembly', icon: '🎯', date: 'Sep 2024' },
                        { name: 'First Project', icon: '⭐', date: 'Mar 2023' },
                      ].map((achievement, index) => (
                        <div key={index} className="text-center p-3 border-2 border-pop-black rounded-lg hover:bg-pop-blue/5 transition-colors">
                          <div className="text-2xl mb-1">{achievement.icon}</div>
                          <div className="systematic-caps text-xs font-medium">{achievement.name}</div>
                          <div className="systematic-caps text-xs text-gray-600">{achievement.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="systematic-caps font-medium text-pop-black mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Basic Assembly', 'Advanced Techniques', 'Quality Control', 'Workshop Teaching', 
                        'Team Leadership', 'Design Thinking', 'Material Knowledge', 'Safety Protocols',
                        'Community Building', 'Mentoring', 'Process Improvement', 'Sustainability'
                      ].map((skill, index) => (
                        <Badge key={index} variant="outline" className="systematic-caps text-xs border-pop-black">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}