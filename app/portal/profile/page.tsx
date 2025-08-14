'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { User, Mail, Phone, Calendar, MapPin, Award, Clock, Settings } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

interface UserData {
  _id: string;
  name: string;
  email: string;
  userType: string;
  orgId?: string;
  location?: string;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
  itemsAssembled?: number;
  totalHoursLogged?: number;
  favoriteProducts?: string[];
  assemblyStories?: any[];
  permissions?: string[];
  assignedRoutes?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchUserData();
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/profile/user');
      const data = await response.json();
      
      if (data.success) {
        setUserData(data.user);
      } else {
        console.error('Failed to fetch user data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  const getUserTypeDisplay = (userType?: string) => {
    const skillLevel = userData?.skillLevel || 'beginner';
    const capitalizedSkill = skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1);
    
    switch (userType) {
      case 'super_admin':
        return `Maker ${capitalizedSkill} • Super Admin`;
      case 'admin':
        return `Maker ${capitalizedSkill} • Admin`;
      case 'staff':
        return `Maker ${capitalizedSkill} • Operations Staff`;
      case 'partner_owner':
        return `Maker ${capitalizedSkill} • Partner Owner`;
      default:
        return `Maker ${capitalizedSkill}`;
    }
  };

  const getPermissionBadges = () => {
    const badges = ['Maker Profile'];
    
    if (userData?.permissions?.includes('operations') || userData?.userType === 'staff' || userData?.userType === 'admin' || userData?.userType === 'super_admin') {
      badges.push('Operations Dashboard');
    }
    if (userData?.permissions?.includes('admin') || userData?.userType === 'admin' || userData?.userType === 'super_admin') {
      badges.push('Admin Dashboard');
    }
    if (userData?.permissions?.includes('crm') || userData?.userType === 'super_admin') {
      badges.push('CRM Access');
    }
    if (userData?.permissions?.includes('financial') || userData?.userType === 'super_admin') {
      badges.push('Financial Dashboard');
    }
    if (userData?.orgId) {
      badges.push('Partner Reports');
    }
    
    return badges;
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="bg-white border-2 border-pop-black max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h1 className="text-xl font-bold text-pop-black mb-4">Sign In Required</h1>
            <p className="text-gray-600 mb-6">You need to be signed in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-gray-600">Loading your account and maker progression...</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-gray-600">Manage your account and maker progression</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{userData?.name || session?.user?.name || 'Unknown User'}</h2>
                <p className="text-sm text-gray-600">{getUserTypeDisplay(userData?.userType)}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{userData?.email || session?.user?.email || 'No email'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Joined {formatDate(userData?.createdAt)}</span>
              </div>
              {userData?.location && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{userData.location}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-medium mb-3">Access Permissions</h3>
              <div className="flex flex-wrap gap-2">
                {getPermissionBadges().map((badge, index) => (
                  <Badge key={index} className="bg-purple-100 text-purple-700">{badge}</Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
              <Button variant="outline">Change Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* Maker Progression */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-purple-600" />
              <span>Maker Progress</span>
            </CardTitle>
            <CardDescription>Skills and achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Assembly Skills</span>
                  <span className="text-sm text-gray-600">{userData?.skillLevel ? userData.skillLevel.charAt(0).toUpperCase() + userData.skillLevel.slice(1) : 'Beginner'}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`bg-purple-600 h-2 rounded-full ${
                    userData?.skillLevel === 'advanced' ? 'w-full' : 
                    userData?.skillLevel === 'intermediate' ? 'w-2/3' : 'w-1/3'
                  }`}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Items Assembled</span>
                  <span className="text-sm text-gray-600">{userData?.itemsAssembled || 0}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Hours Logged</span>
                  <span className="text-sm text-gray-600">{userData?.totalHoursLogged || 0}h</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t">
              <h4 className="font-medium mb-2">Recent Assembly Stories</h4>
              <div className="space-y-2">
                {userData?.assemblyStories && userData.assemblyStories.length > 0 ? (
                  userData.assemblyStories.slice(0, 3).map((story, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-xs">{story.story}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-500">No assembly stories yet. Start creating to unlock achievements!</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-purple-600" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>Your latest contributions and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userData?.assemblyStories && userData.assemblyStories.length > 0 ? (
              userData.assemblyStories.slice(0, 4).map((story, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium text-sm">{story.story}</span>
                    <p className="text-xs text-gray-600">Assembly activity</p>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(story.date)}</span>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p className="text-sm">No recent activity yet.</p>
                <p className="text-xs mt-1">Start assembling items to see your activity here!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}