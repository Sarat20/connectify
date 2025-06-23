import express from 'express'

const login =async(req,res)=>{
    res.send("login")
}

const signup=async(req,res)=>{
    res.send("register")
}

const logout=async(req,res)=>{
    
}
export  { login,signup,logout};